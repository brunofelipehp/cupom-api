import { FastifyInstance } from "fastify";
import {
  createProductTypes,
  deleteProductTypes,
  getAllProductTypes,
  updateProductTypes,
} from "../controllers/productTypesController";

export async function productsTypesRoutes(app: FastifyInstance) {
  app.get("/products/types", getAllProductTypes);

  app.post("/products/types", createProductTypes);

  app.put("/products/types/:id", updateProductTypes);

  app.delete("/products/types/:id", deleteProductTypes);
}
