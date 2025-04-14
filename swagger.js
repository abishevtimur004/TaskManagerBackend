import swaggerUi from "swagger-ui-express";
import userSchema from "./docs/schemas/user.js";
import authPaths from "./docs/paths/auth.js";

const swaggerDoc = {
  openapi: "3.1.1",
  info: {
    title: "Task manager",
    version: "1.0.0",
    description: "Список API для Task Manager",
  },
  servers: [
    {
      url: "http://localhost:3000", // добавь сервер
      description: "Локальный сервер",
    },
  ],
  components: {
    schemas: {
      User: userSchema,
    },
  },
  paths: {
    ...authPaths,
  },
};

export function setupSwagger(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}
