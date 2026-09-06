import { STORAGE_SERVICE } from "@/microservices/storage/storage-client.constants";
import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Controller("storage-s3")
export class StorageS3Controller {
	constructor(
		@Inject(STORAGE_SERVICE)
		private readonly storageClient: ClientProxy,
	) {}

	@Get("/upload")
	upload() {
		return this.storageClient.send("storage.upload", {
			key: "test.txt44444444",
		});
	}
}
