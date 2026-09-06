import { Injectable } from "@nestjs/common";

@Injectable()
export class UploadFileService {
	async upload(key: string): Promise<string> {
		console.log(`Uploading file with key: ${key}`);
		return `File uploaded successfully: ${key}`;
	}
}
