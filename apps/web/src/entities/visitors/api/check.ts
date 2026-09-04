import { api } from "@/shared/api";
import type { CheckVisitorRequestDto, CheckVisitorResponseDto } from "../model";

export async function visitorCheck({
	path,
	referrer,
	signal,
}: CheckVisitorRequestDto): Promise<void> {
	await api.post<CheckVisitorResponseDto>("/visitors/check", {
		path,
		referrer,
		signal,
	});
}
