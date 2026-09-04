export interface CheckVisitorRequestDto {
	path: string;
	referrer: string;
	signal?: AbortSignal;
}

export interface CheckVisitorResponseDto {
	message: string;
}
