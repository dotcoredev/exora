import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";

import { AppModule } from "./core/app.module.js";

async function bootstrap() {
	const app = await NestFactory.createMicroservice(AppModule, {
		transport: Transport.TCP,
		options: {
			host: process.env.HOST ?? "0.0.0.0",
			port: Number(process.env.PORT ?? 50001),
		},
	});

	await app.listen();
}

await bootstrap();
