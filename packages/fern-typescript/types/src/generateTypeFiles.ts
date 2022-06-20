import { IntermediateRepresentation } from "@fern-api/api";
import { getFilePathForNamedType, getOrCreateSourceFile, TypeResolver } from "@fern-typescript/commons";
import { Directory } from "ts-morph";
import { generateType } from "./generateType";

export function generateTypeFiles({
    modelDirectory,
    intermediateRepresentation,
    typeResolver,
}: {
    modelDirectory: Directory;
    intermediateRepresentation: IntermediateRepresentation;
    typeResolver: TypeResolver;
}): void {
    for (const typeDefinition of intermediateRepresentation.types) {
        const filepath = getFilePathForNamedType({
            modelDirectory,
            typeName: typeDefinition.name,
            typeCategory: "type",
        });

        const file = getOrCreateSourceFile(modelDirectory, filepath);
        generateType({
            type: typeDefinition.shape,
            typeName: typeDefinition.name.name,
            docs: typeDefinition.docs,
            typeResolver,
            modelDirectory,
            file,
        });
    }
}