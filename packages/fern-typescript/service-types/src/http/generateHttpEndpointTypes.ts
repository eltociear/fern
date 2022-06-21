import { HttpEndpoint, NamedType } from "@fern-api/api";
import { DependencyManager, getOrCreateDirectory, TypeResolver } from "@fern-typescript/commons";
import { Directory } from "ts-morph";
import { generateRequestTypes } from "./generateRequestTypes";
import { generateResponseTypes } from "./generateResponseTypes";
import { GeneratedHttpEndpointTypes } from "./types";

export function generateHttpEndpointTypes({
    serviceName,
    endpoint,
    endpointsDirectory,
    servicesDirectory,
    modelDirectory,
    typeResolver,
    dependencyManager,
}: {
    serviceName: NamedType;
    endpoint: HttpEndpoint;
    endpointsDirectory: Directory;
    modelDirectory: Directory;
    servicesDirectory: Directory;
    typeResolver: TypeResolver;
    dependencyManager: DependencyManager;
}): GeneratedHttpEndpointTypes {
    const endpointDirectory = getOrCreateDirectory(endpointsDirectory, endpoint.endpointId, {
        exportOptions: {
            type: "namespace",
            namespace: endpoint.endpointId,
        },
    });

    return {
        methodName: endpoint.endpointId,
        request: generateRequestTypes({
            serviceName,
            endpoint,
            endpointDirectory,
            modelDirectory,
            servicesDirectory,
            typeResolver,
        }),
        response: generateResponseTypes({
            serviceName,
            endpoint,
            endpointDirectory,
            modelDirectory,
            servicesDirectory,
            typeResolver,
            dependencyManager,
        }),
    };
}