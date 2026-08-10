import { Controller } from "@nestjs/common";
import { RateHistoryService } from "./rate-history.service";

@Controller("rates/history")
export class RateHistoryController {
	constructor(private readonly rateHistoryService: RateHistoryService) {}
}
