import { z } from 'zod';

const schema = z
  .object({
    VITE_API: z.string(),
    VITE_CIRCLE: z.string(),
    VITE_VERSION: z.string(),
  })
  .transform((env) => ({
    api: env.VITE_API,
    circle: env.VITE_CIRCLE,
    version: env.VITE_VERSION,
  }));
export type Config = z.infer<typeof schema>;
export const config = schema.parse(import.meta.env);
