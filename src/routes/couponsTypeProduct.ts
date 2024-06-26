import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

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

  app.get("/apply-couponsz", async (request, reply) => {
    try {
      const bodySchema = z.object({
        code: z.string(),
      });

      const { code } = bodySchema.parse(request.params);

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
      const paramsSchema = z.object({
        id: z.string().uuid(),
      });

      const bodySchema = z.object({
        code: z.string(),
        baseDiscount: z.number(),
        additionalDiscount: z.number(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
      });

      const { id } = paramsSchema.parse(request.params);

      const { code, baseDiscount, additionalDiscount, createdAt, updatedAt } =
        bodySchema.parse(request.body);

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
      const paramsSchema = z.object({
        id: z.string().uuid(),
      });

      const bodySchema = z.object({
        code: z.string(),
        baseDiscount: z.number(),
        additionalDiscount: z.number(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
      });

      const { id } = paramsSchema.parse(request.params);

      const { code, baseDiscount, additionalDiscount, createdAt, updatedAt } =
        bodySchema.parse(request.body);

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
