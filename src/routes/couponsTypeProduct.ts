import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { couponBodySchema } from "../schema/couponSchema";
import { idParamsSchema } from "../schema/idParamsSchema";
import { couponProductTypeBodySchema } from "../schema/couponProductTypeSchema";

export async function couponsProductRoutes(app: FastifyInstance) {
  app.get("/coupons", async (request, reply) => {
    try {
      const coupons = await prisma.coupon.findMany();

      console.log(coupons);

      return reply.code(200).send(coupons);
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/apply-coupons", async (request, reply) => {
    try {
      const { code } = couponProductTypeBodySchema.parse(request.body);

      const coupons = await prisma.coupon.findUnique({
        where: {
          code,
        },
      });

      return reply.code(200).send(coupons);
    } catch (error) {
      console.log(error);
    }
  });

  app.put("/coupons/:id", async (request, reply) => {
    try {
      const { id } = idParamsSchema.parse(request.params);

      const { code, baseDiscount, additionalDiscount, createdAt, updatedAt } =
        couponBodySchema.parse(request.body);

      const productsTypes = await prisma.coupon.update({
        where: {
          id,
        },
        data: {
          code,
          baseDiscount,
          additionalDiscount,
          createdAt,
          updatedAt,
        },
      });

      return reply.code(204).send(productsTypes);
    } catch (error) {
      console.log(error);
      return reply.code(404);
    }
  });

  app.delete("/coupons/:id", async (request, reply) => {
    try {
      const { id } = idParamsSchema.parse(request.params);

      const productsTypes = await prisma.coupon.delete({
        where: {
          id,
        },
      });

      return reply.code(202).send("Category deleted with success");
    } catch (error) {
      console.log(error);

      return reply.code(404);
    }
  });
}
