import { z } from "zod";

export const couponBodySchema = z.object({
  code: z.string(),
  baseDiscount: z.number(),
  additionalDiscount: z.number(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
