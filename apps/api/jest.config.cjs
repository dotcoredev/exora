const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

module.exports = {
	moduleFileExtensions: ["js", "json", "ts"],
	rootDir: ".",
	roots: ["<rootDir>/src"],
	testRegex: ".*\\.spec\\.ts$",
	transform: {
		"^.+\\.(t|j)s$": ["ts-jest"],
	},
	moduleNameMapper: {
		...pathsToModuleNameMapper(compilerOptions.paths ?? {}, {
			prefix: "<rootDir>/",
		}),
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	collectCoverageFrom: ["src/**/*.(t|j)s"],
	coverageDirectory: "<rootDir>/coverage",
	testEnvironment: "node",
};
