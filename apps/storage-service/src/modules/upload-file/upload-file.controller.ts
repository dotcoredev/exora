import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { UploadFileService } from "./upload-file.service.js";

@Controller()
export class UploadFileController {
	constructor(private readonly uploadFileService: UploadFileService) {}

	@MessagePattern("storage.upload")
	async upload(data: { key: string }): Promise<string> {
		return this.uploadFileService.upload(data.key);
	}
}
