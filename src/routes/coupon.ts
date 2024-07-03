import { FastifyInstance } from "fastify";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
  updateCoupon,
} from "../controllers/couponsController";

export async function couponRoutes(app: FastifyInstance) {
  app.get("/coupons", getAllCoupons);

  app.post("/coupons", createCoupon);

  app.put("/coupons/:id", updateCoupon);

  app.delete("/coupons/:id", deleteCoupon);
}
