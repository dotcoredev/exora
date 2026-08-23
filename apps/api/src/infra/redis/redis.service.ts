import { ConfigsType } from "@/config";
import {
	Injectable,
	Logger,
	type OnModuleDestroy,
	type OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";

@Injectable()
export class RedisService
	extends Redis
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(RedisService.name);

	constructor(configService: ConfigService<ConfigsType>) {
		super(configService.getOrThrow("redis"));
	}

	async onModuleInit(): Promise<void> {
		const start = Date.now();
		this.logger.log("Initializing Redis connection...");

		await this.connect();

		this.on("connect", () => {
			this.logger.log("Redis connecting...");
		});

		this.on("ready", () => {
			const ms = Date.now() - start;
			this.logger.log(`Redis connected (time=${ms})`);
		});

		this.on("error", (error) => {
			this.logger.error("Redis error", {
				error: error.message ?? error,
			});
		});

		this.on("close", () => {
			this.logger.warn("Redis connection closed");
		});

		this.on("reconnecting", () => {
			this.logger.log("Redis reconnecting...");
		});
	}

	async onModuleDestroy() {
		this.logger.log("Closing redis connectino...");

		try {
			await this.quit();
			this.logger.log("Redis connection closed");
		} catch (error) {
			this.logger.error("Error Redis connection closed", error);
		}
	}
}
