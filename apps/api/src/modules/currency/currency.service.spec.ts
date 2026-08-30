import { Test, type TestingModule } from "@nestjs/testing";
import { ConfigService } from "@nestjs/config";

import { CurrencyService } from "./currency.service";
import { PrismaService } from "@/infra/prisma/prisma.service";
import { RedisService } from "@/infra/redis/redis.service";
import { KEY_CURRENCY } from "@/common/constants";

describe("CurrencyService", () => {
	let service: CurrencyService;

	const prismaServiceMock = {
		currency: {
			findMany: jest.fn(),
		},
	};

	const redisServiceMock = {
		get: jest.fn(),
		set: jest.fn(),
	};

	const configServiceMock = {
		getOrThrow: jest.fn(),
	};

	beforeEach(async () => {
		jest.clearAllMocks();

		configServiceMock.getOrThrow.mockReturnValue(3600);

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CurrencyService,

				{
					provide: PrismaService,
					useValue: prismaServiceMock,
				},

				{
					provide: RedisService,
					useValue: redisServiceMock,
				},

				{
					provide: ConfigService,
					useValue: configServiceMock,
				},
			],
		}).compile();

		service = module.get(CurrencyService);
	});

	describe("currencies", () => {
		it("должен вернуть валюты из Redis, если кэш существует", async () => {
			const cachedCurrencies = [
				{
					id: 1,
					isoCode: "USD",
					name: "US Dollar",
					startDate: "1990-01-01T00:00:00.000Z",
				},
			];

			redisServiceMock.get.mockResolvedValue(
				JSON.stringify(cachedCurrencies),
			);

			const result = await service.currencies();

			expect(result).toEqual(cachedCurrencies);

			expect(redisServiceMock.get).toHaveBeenCalledWith(KEY_CURRENCY);

			expect(
				prismaServiceMock.currency.findMany,
			).not.toHaveBeenCalled();

			expect(redisServiceMock.set).not.toHaveBeenCalled();
		});

		it("должен получить валюты из БД и сохранить их в Redis, если кэша нет", async () => {
			const currencies = [
				{
					id: 1,
					isoCode: "USD",
					name: "US Dollar",
					startDate: new Date("1990-01-01"),
				},
			];

			redisServiceMock.get.mockResolvedValue(null);

			prismaServiceMock.currency.findMany.mockResolvedValue(
				currencies,
			);

			redisServiceMock.set.mockResolvedValue("OK");

			const result = await service.currencies();

			const expected = [
				{
					id: 1,
					isoCode: "USD",
					name: "US Dollar",
					startDate: "1990-01-01T00:00:00.000Z",
				},
			];

			expect(result).toEqual(expected);

			expect(
				prismaServiceMock.currency.findMany,
			).toHaveBeenCalledTimes(1);

			expect(redisServiceMock.set).toHaveBeenCalledWith(
				KEY_CURRENCY,
				JSON.stringify(expected),
				"EX",
				3600,
			);
		});

		it("должен выбросить ошибку, если Redis get упал", async () => {
			const error = new Error("Redis error");

			redisServiceMock.get.mockRejectedValue(error);

			await expect(service.currencies()).rejects.toThrow(
				"Redis error",
			);

			expect(
				prismaServiceMock.currency.findMany,
			).not.toHaveBeenCalled();
		});

		it("должен выбросить ошибку, если Prisma упала", async () => {
			const error = new Error("Database error");

			redisServiceMock.get.mockResolvedValue(null);

			prismaServiceMock.currency.findMany.mockRejectedValue(
				error,
			);

			await expect(service.currencies()).rejects.toThrow(
				"Database error",
			);

			expect(redisServiceMock.set).not.toHaveBeenCalled();
		});

		it("должен выбросить ошибку, если запись в Redis упала", async () => {
			redisServiceMock.get.mockResolvedValue(null);

			prismaServiceMock.currency.findMany.mockResolvedValue([
				{
					id: 1,
					isoCode: "USD",
					name: "US Dollar",
					startDate: new Date("1990-01-01"),
				},
			]);

			redisServiceMock.set.mockRejectedValue(
				new Error("Redis set error"),
			);

			await expect(service.currencies()).rejects.toThrow(
				"Redis set error",
			);
		});
	});
});