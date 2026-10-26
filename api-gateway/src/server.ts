import express from "express";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 4000;
const userServiceUrl = process.env.USER_SERVICE_URL || "http://localhost:4002";
const productServiceUrl =
  process.env.PRODUCT_SERVICE_URL || "http://localhost:4003";

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    service: "api-gateway",
  });
});

app.use(
  "/api/users",
  createProxyMiddleware({
    target: userServiceUrl,
    changeOrigin: true,
    pathRewrite: (path) => `/users${path}`,
  }),
);

app.use(
  "/api/products",
  createProxyMiddleware({
    target: productServiceUrl,
    changeOrigin: true,
    pathRewrite: (path) => `/products${path}`,
  }),
);

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
