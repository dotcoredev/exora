import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggingInterceptor } from "@/common/interceptors";
import { ConfigService } from "@nestjs/config";
import type { ConfigsType } from "./config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService<ConfigsType>);
	const port = configService.getOrThrow("app.port", { infer: true });
	const origins = configService.getOrThrow("app.origins", { infer: true });

	app.setGlobalPrefix("api");
	app.enableCors({
		origin: origins,
		credentials: true,
	});

	app.enableShutdownHooks();
	app.useGlobalInterceptors(new LoggingInterceptor());

	await app.listen(port, "0.0.0.0");
}
bootstrap();
