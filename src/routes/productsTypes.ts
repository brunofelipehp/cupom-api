import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { productTypeBodySchema } from "../schema/productTypeSchema";
import { idParamsSchema } from "../schema/idParamsSchema";

export async function productsTypesRoutes(app: FastifyInstance) {
  app.get("/products/types", async (request, reply) => {
    try {
      const productsTypes = await prisma.productType.findMany();

      console.log(productsTypes);

      return reply.code(200).send(productsTypes);
    } catch (error) {
      console.log(error);
    }
  });

  app.post("/products/types", async (request, reply) => {
    try {
      const { name, createdAt, updatedAt } = productTypeBodySchema.parse(
        request.body
      );

      const productsTypes = await prisma.productType.create({
        data: {
          name,
          createdAt,
          updatedAt,
        },
      });

      return reply.code(201).send(productsTypes);
    } catch (error) {
      console.log(error);
    }
  });

  app.put("/products/types/:id", async (request, reply) => {
    try {
      const { id } = idParamsSchema.parse(request.params);

      const { name, createdAt, updatedAt } = productTypeBodySchema.parse(
        request.body
      );

      const productsTypes = await prisma.productType.update({
        where: {
          id,
        },
        data: {
          name,
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

  app.delete("/products/types/:id", async (request, reply) => {
    try {
      const { id } = idParamsSchema.parse(request.params);

      await prisma.productType.delete({
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
