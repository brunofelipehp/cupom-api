import { z } from "zod";

export const couponProductTypeBodySchema = z.object({
  code: z.string(),
});

export const applyCouponBodySchema = z.object({
  code: z.string(),
  productCount: z.number(),
  productTypeName: z.string(),
});
