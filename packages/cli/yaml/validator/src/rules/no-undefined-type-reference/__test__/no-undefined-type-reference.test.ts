import { AbsoluteFilePath, join, RelativeFilePath } from "@fern-api/core-utils";
import { getViolationsForRule } from "../../../testing-utils/getViolationsForRule";
import { NoUndefinedTypeReferenceRule } from "../no-undefined-type-reference";

describe("no-undefined-type-reference", () => {
    it("simple", async () => {
        const violations = await getViolationsForRule({
            rule: NoUndefinedTypeReferenceRule,
            pathToWorkspace: join(
                AbsoluteFilePath.of(__dirname),
                RelativeFilePath.of("fixtures"),
                RelativeFilePath.of("simple")
            ),
        });

        expect(violations).toEqual([
            {
                message: "Type MissingType is not defined.",
                nodePath: ["types", "MyType"],
                relativeFilepath: "simple.yml",
                severity: "error",
            },
            {
                message: "Type MissingType is not defined.",
                nodePath: ["types", "MyListType"],
                relativeFilepath: "simple.yml",
                severity: "error",
            },
            {
                message: "Type commons.MissingType is not defined.",
                nodePath: ["types", "MyListType2"],
                relativeFilepath: "simple.yml",
                severity: "error",
            },
            {
                message: "Type nonExistentFile.MissingType is not defined.",
                nodePath: ["types", "MyListType3"],
                relativeFilepath: "simple.yml",
                severity: "error",
            },
            {
                message: "Type commons.DoesNotExist is not defined.",
                nodePath: ["types", "ImportedType"],
                relativeFilepath: "simple.yml",
                severity: "error",
            },
        ]);
    });
});
