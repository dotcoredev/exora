import { Body, Controller, Post, Req } from "@nestjs/common";
import { VisitorsService } from "./visitors.service";
import {
	checkVisitorRequestSchema,
	type CheckVisitorRequestDto,
} from "./dto/requests";
import { ZodValidationPipe } from "@/common/pipes";
import type { Request } from "express";

@Controller("visitors")
export class VisitorsController {
	constructor(private readonly visitorsService: VisitorsService) {}

	@Post("/check")
	async checkVisitor(
		@Req() req: Request,
		@Body(new ZodValidationPipe(checkVisitorRequestSchema))
		dto: CheckVisitorRequestDto,
	) {
		return this.visitorsService.checkVisitor(req, dto);
	}
}
