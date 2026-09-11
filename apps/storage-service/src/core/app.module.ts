import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { appEnv } from "../configs/env/index.js";
import { UploadFileModule } from "../modules/upload-file/upload-file.module.js";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [appEnv],
		}),
		UploadFileModule,
	],
})
export class AppModule {}
