import { Module } from "@nestjs/common";
import { StorageS3Controller } from "./storage_s3.controller";
import { StorageClientModule } from "@/microservices/storage/storage-client.module";

@Module({
	imports: [StorageClientModule],
	controllers: [StorageS3Controller],
})
export class StorageS3Module {}
