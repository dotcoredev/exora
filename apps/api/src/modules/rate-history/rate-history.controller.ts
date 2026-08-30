import { Controller, Get, Query } from "@nestjs/common";
import { RateHistoryService } from "./rate-history.service";
import { ZodValidationPipe } from "@/common/pipes";
import {
	type RateHistoryRequestDto,
	rateHistoryRequestSchema,
} from "./dto/requests";

@Controller("rates/history")
export class RateHistoryController {
	constructor(private readonly rateHistoryService: RateHistoryService) {}

	@Get("/")
	async rateHistory(
		@Query(new ZodValidationPipe(rateHistoryRequestSchema))
		query: RateHistoryRequestDto,
	) {
		return this.rateHistoryService.getHistory(
			query.base,
			query.quote,
			query.from,
		);
	}
}
