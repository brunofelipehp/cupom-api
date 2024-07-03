import { FastifyInstance } from "fastify";
import { createApplyCoupon } from "../controllers/couponProductsController";

export async function couponsProductRoutes(app: FastifyInstance) {
  app.post("/apply-coupons", createApplyCoupon);
}
