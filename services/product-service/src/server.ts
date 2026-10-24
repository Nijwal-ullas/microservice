
import express from "express";
import dotenv from "dotenv";
import connectDB from "./confiq/db.js";
import productRouter from "./router/productRouter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    service: "product-service",
  });
});

app.use("/products", productRouter);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Product Service running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start Product Service:", error);
  process.exit(1);
});
