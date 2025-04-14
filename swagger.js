import swaggerUi from "swagger-ui-express";
import userSchema from "./docs/schemas/user.js";
import authPaths from "./docs/paths/authPath.js";
import profilePath from "./docs/paths/profilePath.js";

const swaggerDoc = {
  openapi: "3.1.1",
  info: {
    title: "Task manager",
    version: "1.0.0",
    description: "Список API для Task Manager",
  },
  servers: [
    {
      url: "https://taskmanagerbackend-3ee1.onrender.com", 
      description: "Прод сервер (Render)",
    },
    {
      url: "http://localhost:3000",
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
    ...profilePath
  },
};

export function setupSwagger(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}
