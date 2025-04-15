import taskSchema from "../schemas/task.js"; 

const taskPath = {
  "/api/task": {
    get: {
      tags: ["Tasks"],
      summary: "Получить список задач пользователя",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Задачи получены",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Task" },
            },
          },
        },
        401: {
          description: "Не авторизован",
        },
      },
    },
    post: {
      tags: ["Tasks"],
      summary: "Создать новую задачу",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: taskSchema,
          },
        },
      },
      responses: {
        201: {
          description: "Задача создана",
          content: {
            "application/json": {
              schema: taskSchema,
            },
          },
        },
        400: {
          description: "Некорректные данные",
        },
        401: {
          description: "Не авторизован",
        },
      },
    },
  },
  "/api/tasks/{id}": {
    get: {
      tags: ["Tasks"],
      summary: "Получить задачу по ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Задача найдена",
          content: {
            "application/json": {
              schema: taskSchema,
            },
          },
        },
        404: {
          description: "Задача не найдена",
        },
        401: {
          description: "Не авторизован",
        },
      },
    },
    put: {
      tags: ["Tasks"],
      summary: "Обновить задачу по ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: taskSchema,
          },
        },
      },
      responses: {
        200: {
          description: "Задача обновлена",
          content: {
            "application/json": {
              schema: taskSchema,
            },
          },
        },
        400: {
          description: "Некорректные данные",
        },
        404: {
          description: "Задача не найдена",
        },
        401: {
          description: "Не авторизован",
        },
      },
    },
    delete: {
      tags: ["Tasks"],
      summary: "Удалить задачу по ID",
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Задача удалена",
        },
        404: {
          description: "Задача не найдена",
        },
        401: {
          description: "Не авторизован",
        },
      },
    },
  },
};

export default taskPath;
