import z from "zod";

export const checkVisitorRequestSchema = z.object({
	path: z.string().startsWith("/"),

	referrer: z
		.union([z.url(), z.literal("")])
		.transform((value) => value || undefined)
		.optional(),
});

export type CheckVisitorRequestDto = z.infer<typeof checkVisitorRequestSchema>;
