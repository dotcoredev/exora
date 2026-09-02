import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { chromium } from "playwright";

@Injectable()
export class ResumeService {
	constructor(private readonly configService: ConfigService) {}
	async generatePdf() {
		const browser = await chromium.launch();

		const page = await browser.newPage();

		await page.goto("https://resume.nicodes.ru/", {
			waitUntil: "networkidle",
		});

		await page.pdf({
			path: this.configService.get("RESUME_PDF_PATH"),
			format: "A4",
			printBackground: true,
			margin: {
				top: "0mm",
				right: "0mm",
				bottom: "0mm",
				left: "0mm",
			},
		});

		await browser.close();
	}
}
