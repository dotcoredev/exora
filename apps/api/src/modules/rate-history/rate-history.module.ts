import { Module } from "@nestjs/common";
import { RateHistoryService } from "./rate-history.service";
import { RateHistoryController } from "./rate-history.controller";

/*
	7D;
	1M;
	3M;
	1Y;
	чтение истории из PostgreSQL.
*/

@Module({
	controllers: [RateHistoryController],
	providers: [RateHistoryService],
})
export class RateHistoryModule {}
