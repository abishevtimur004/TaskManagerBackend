import "./config.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import { setupSwagger } from "./swagger.js";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/auth-system";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

const startServer = async () => {
  try {
    await connectDB();

    app.use(cors());
    app.use(express.json());

    app.use("/api/users", userRoutes);
    app.use("/api/profile", profileRoutes);
    app.post("/ping", (req, res) => {
      res.send("pong");
    });

    app.use("/uploads", express.static("uploads"));

    setupSwagger(app);

    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: "Something broke!" });
    });

    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Ошибка инициализации сервера:", error.message);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});

startServer();
