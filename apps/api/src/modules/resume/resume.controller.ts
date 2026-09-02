import { Controller, Get, HttpException } from "@nestjs/common";
import { ResumeService } from "./resume.service";

@Controller("resume")
export class ResumeController {
	constructor(private readonly resumeService: ResumeService) {}

	@Get("/generate-pdf")
	async generatePdf() {
		try {
			await this.resumeService.generatePdf();
			return {
				message: "PDF generated successfully",
				link: "https://files.nicodes.ru/files/resume.pdf",
			};
		} catch (err) {
			console.log(1, err);
			throw new HttpException("Failed to generate PDF", 500);
		}
	}
}
