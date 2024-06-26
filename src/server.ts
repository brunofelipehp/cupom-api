import fastify from "fastify";
import { couponRoutes } from "./routes/coupon";
import { productsTypesRoutes } from "./routes/productsTypes";

const app = fastify();

app.register(couponRoutes);
app.register(productsTypesRoutes);

const port = 5130;

app.listen({ port }).then(() => {
  console.log(`Server in ruinnig port  ${port}`);
});
