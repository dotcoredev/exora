let authToken: string | null = null;

export function getAccessToken(): string | null {
	return authToken;
}

export function setAccessToken(token: string | null): void {
	authToken = token;
}
