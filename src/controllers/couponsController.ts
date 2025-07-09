import { prisma } from "../lib/prisma";
import { couponBodySchema } from "../schema/couponSchema";
import { idParamsSchema } from "../schema/idParamsSchema";

export const getAllCoupons = async (reply, request) => {
  try {
    const coupons = await prisma.coupon.findMany();


    return reply.code(200).send(coupons);
  } catch (error) {
    console.log(error);
  }
};

export const createCoupon = async (reply, request) => {
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
};

export const updateCoupon = async (request, reply) => {
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
};

export const deleteCoupon = async (request, reply) => {
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
};
