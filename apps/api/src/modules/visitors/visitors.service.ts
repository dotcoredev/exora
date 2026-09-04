import { Injectable } from "@nestjs/common";
import type { CheckVisitorRequestDto } from "./dto/requests";
import { PrismaService } from "@/infra/prisma/prisma.service";
import type { Request } from "express";
import { UAParser } from "ua-parser-js";

@Injectable()
export class VisitorsService {
	constructor(private readonly prismaService: PrismaService) {}

	async checkVisitor(
		req: Request,
		dto: CheckVisitorRequestDto,
	): Promise<{ message: string }> {
		const userAgent = req.headers["user-agent"] ?? "";

		const parser = new UAParser(userAgent);
		const result = parser.getResult();

		await this.prismaService.visitor.create({
			data: {
				path: dto.path ?? "",
				referer: dto.referrer ?? "",

				ip: req.ip,
				userAgent: req.headers["user-agent"],
				host: req.hostname,

				browser: result.browser.name ?? null,
				os: result.os.name ?? null,
				device: result.device.type ?? "desktop",
			},
		});

		return { message: "Visitor checked successfully" };
	}
}
