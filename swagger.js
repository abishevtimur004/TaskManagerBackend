import swaggerUi from "swagger-ui-express";
import userSchema from "./docs/schemas/user.js";
import authPaths from "./docs/paths/authPath.js";
import profilePath from "./docs/paths/profilePath.js";
import profileSchema from "./docs/schemas/profile.js";
import taskSchema from "./docs/schemas/task.js";
import taskPath from "./docs/paths/taskPath.js";

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
      Profile: profileSchema,
      Task: taskSchema,
    },
  },
  paths: {
    ...authPaths,
    ...profilePath,
    ...taskPath,
  },
};

export function setupSwagger(app) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}
