/// <reference types="vite/client" />
declare module "@hookform/resolvers/yup" {
  import { AnySchema } from "yup";
  export interface ResolverOptions {
    criteriaMode?: "firstError" | "all";
    names?: string[];
  }
  export function yupResolver(
    schema: AnySchema,
    options?: ResolverOptions
  ): any;
}
