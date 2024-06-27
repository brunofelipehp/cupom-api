import { z } from "zod";

export const productTypeBodySchema = z.object({
  name: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
