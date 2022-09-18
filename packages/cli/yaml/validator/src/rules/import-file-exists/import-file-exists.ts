import { dirname, doesPathExist, join } from "@fern-api/core-utils";
import chalk from "chalk";
import { Rule, RuleViolation } from "../../Rule";

export const ImportFileExistsRule: Rule = {
    name: "import-file-exists",
    create: ({ workspace }) => {
        return {
            import: async ({ importedAs, importPath }, { relativeFilepath }) => {
                const violations: RuleViolation[] = [];
                const importedFilePath = join(workspace.pathToDefinition, dirname(relativeFilepath), importPath);
                const fileExists = await doesPathExist(importedFilePath);
                if (!fileExists) {
                    violations.push({
                        severity: "error",
                        message: `Import ${chalk.bold(importedAs)} points to non-existent path ${chalk.bold(
                            importPath
                        )}.`,
                    });
                }
                return violations;
            },
        };
    },
};
