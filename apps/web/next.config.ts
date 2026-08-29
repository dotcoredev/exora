import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
	reactCompiler: true,
	output: "standalone",
	outputFileTracingRoot: path.join(process.cwd(), "../.."),
	outputFileTracingIncludes: {
		"*": ["./node_modules/@swc/helpers/esm/**"],
	},
};

export default nextConfig;
