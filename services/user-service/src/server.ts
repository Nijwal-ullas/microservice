import express from "express";
import dotenv from "dotenv";
import connectDB from "./confiq/db.js";
import userRouter from "./router/userRouter.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    service: "user-service",
    message: "User Service is running",
  });
});

app.use("/users", userRouter);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
  });
};

startServer();