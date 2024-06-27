import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { couponBodySchema } from "../schema/couponSchema";
import { idParamsSchema } from "../schema/idParamsSchema";
import { applyCouponBodySchema } from "../schema/couponProductTypeSchema";

export async function couponRoutes(app: FastifyInstance) {
  app.get("/coupons", async (request, reply) => {
    try {
      const coupons = await prisma.coupon.findMany();

      console.log(coupons);

      return reply.code(200).send(coupons);
    } catch (error) {
      console.log(error);
    }
  });

  app.post("/coupons", async (request, reply) => {
    try {
      const { code, baseDiscount, additionalDiscount, createdAt, updatedAt } =
        couponBodySchema.parse(request.body);

      const coupons = await prisma.coupon.create({
        data: {
          code,
          baseDiscount,
          additionalDiscount,
          createdAt,
          updatedAt,
        },
      });

      return reply.code(201).send(coupons);
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

  // create coupons

  app.post("/apply-coupons", async (request, reply) => {
    try {
      const { code, productCount, productTypeName } =
        applyCouponBodySchema.parse(request.body);

      const coupon = await prisma.coupon.findUnique({
        where: {
          code,
        },
      });

      if (!coupon) {
        return reply.code(404).send("Cupom  não encontrado");
      }

      const product = await prisma.productType.findUnique({
        where: {
          name: productTypeName,
        },
      });

      if (!product) {
        return reply.code(404).send("produto não existe");
      }

      const existingAssociation = await prisma.couponProductType.findUnique({
        where: {
          productTypeId: product.id,
        },
      });

      if (existingAssociation) {
        return reply
          .code(404)
          .send(
            "Essa categoria de produto já possui um cupom de desconto associado."
          );
      }

      const totalDiscount =
        ((coupon.baseDiscount +
          (productCount - 1) * coupon.additionalDiscount) /
          100) *
        10;

      const newAssociation = await prisma.couponProductType.create({
        data: {
          couponId: coupon.id,
          productTypeId: product.id,
        },
      });

      return reply.code(201).send({ newAssociation, totalDiscount });
    } catch (error) {
      console.log(error);
      return reply.code(400).send("Error em criar associação de cupom");
    }
  });
}
