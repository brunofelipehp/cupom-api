import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

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
      const bodySchema = z.object({
        name: z.string(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
      });

      const { name, createdAt, updatedAt } = bodySchema.parse(request.body);

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
      const paramsSchema = z.object({
        id: z.string().uuid(),
      });

      const bodySchema = z.object({
        name: z.string(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
      });

      const { id } = paramsSchema.parse(request.params);

      const { name, createdAt, updatedAt } = bodySchema.parse(request.body);

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
      const paramsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = paramsSchema.parse(request.params);

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
