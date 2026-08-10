import {
	Injectable,
	Logger,
	type OnModuleDestroy,
	type OnModuleInit,
} from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { ConfigService } from "@nestjs/config";
import { PrismaClient } from "@prisma/generated/client";
import type { ConfigsType } from "@/config";

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleInit, OnModuleDestroy
{
	private readonly logger = new Logger(PrismaService.name);

	constructor(config: ConfigService<ConfigsType>) {
		const adapter = new PrismaPg(config.getOrThrow("postgres"));
		super({
			adapter,
		});
	}

	async onModuleInit() {
		const start = Date.now();
		this.logger.log("Connecting to database...");

		try {
			await this.$connect();
			const ms = Date.now() - start;
			this.logger.log(`Database connection established (time=${ms}ms)`);
		} catch (error) {
			this.logger.error("Failed to connect to database: ", error);
			throw error;
		}
	}

	async onModuleDestroy() {
		this.logger.log("Disconnecting from database...");

		try {
			await this.$disconnect();
			this.logger.log("Database connection closed");
		} catch (error) {
			this.logger.error("Failed to connect to database: ", error);
		}
	}
}
