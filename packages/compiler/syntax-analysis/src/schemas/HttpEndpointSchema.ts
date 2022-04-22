import { z } from "zod";
import { AuthSchema } from "./AuthSchema";
import { ErrorReferenceSchema } from "./ErrorReferenceSchema";
import { HttpHeaderSchema } from "./HttpHeaderSchema";
import { HttpParameterSchema } from "./HttpParameterSchema";
import { HttpQueryParameterSchema } from "./HttpQueryParameterSchema";
import { HttpRequestSchema } from "./HttpRequestSchema";
import { HttpResponseSchema } from "./HttpResponseSchema";
import { WithDocsSchema } from "./utils/WithDocsSchema";

export const HttpEndpointSchema = z
    .strictObject({
        method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
        path: z.string(),
        parameters: z.optional(z.record(HttpParameterSchema)),
        queryParameters: z.optional(z.record(HttpQueryParameterSchema)),
        headers: z.optional(z.record(HttpHeaderSchema)),
        auth: z.optional(AuthSchema),
        request: z.optional(HttpRequestSchema),
        response: z.optional(HttpResponseSchema),
        errors: z.optional(z.record(ErrorReferenceSchema)),
    })
    .merge(WithDocsSchema);

export type HttpEndpointSchema = z.infer<typeof HttpEndpointSchema>;
