import { Test, TestingModule } from "@nestjs/testing";
import { CurrencyController } from "./currency.controller"
import { CurrencyService } from "./currency.service";

const currencies = {
    symbol: "symbol",
    name: "name",
    id: "id",
    isoCode: "isoCode",
    isoNumeric: "isoNumeric",
    ru: "name ru",
    startDate: "2026-08-12"
};

describe("Currency controller tests", () => {
    let controller: CurrencyController;
    let service: CurrencyService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CurrencyController],
            providers: [{
                provide: CurrencyService,
                useValue: {
                    currencies: jest.fn().mockResolvedValue([currencies])
                }
            }]
        }).compile();

        controller = module.get<CurrencyController>(CurrencyController);
        service = module.get<CurrencyService>(CurrencyService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should return an array currencies', async () => {
        const result = await controller.currencies();
        expect(result).toEqual([currencies])
    });

})