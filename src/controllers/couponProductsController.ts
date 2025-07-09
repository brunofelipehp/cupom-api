import { prisma } from "../lib/prisma";
import { applyCouponBodySchema } from "../schema/couponProductTypeSchema";

export const createApplyCoupon = async (request, reply) => {
  try {
    const { code, productCount, productTypeName } = applyCouponBodySchema.parse(
      request.body
    );

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
      ((coupon.baseDiscount + (productCount - 1) * coupon.additionalDiscount) /
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
    return reply.code(400).send("Error em criar associação de cupom");
  }
};
