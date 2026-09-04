import { api } from "@/shared/api";
import type { CheckVisitorRequestDto, CheckVisitorResponseDto } from "../model";

export async function visitorCheck({
	path,
	referrer,
}: CheckVisitorRequestDto): Promise<CheckVisitorResponseDto> {
	const { data } = await api.post<CheckVisitorResponseDto>(
		"/visitors/check",
		{
			path,
			referrer,
		},
	);

	return data;
}
