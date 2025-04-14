const profilePath = {
  "/api/profile": {
    get: {
      tags: ["Profile"],
      summary: "Получить мой профиль",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Профиль найден",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Profile" },
            },
          },
        },
        404: {
          description: "Профиль не найден",
        },
      },
    },
    post: {
      tags: ["Profile"],
      summary: "Создать профиль",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["firstName", "lastName"],
              properties: {
                firstName: { type: "string", example: "Daniyar" },
                lastName: { type: "string", example: "Abishev" },
                bio: { type: "string", example: "Fullstack developer" },
                avatar: { type: "string", example: "/uploads/avatar.jpg" },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Профиль создан",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Profile" },
            },
          },
        },
        400: {
          description: "Профиль уже существует",
        },
      },
    },
    put: {
      tags: ["Profile"],
      summary: "Обновить мой профиль",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                firstName: { type: "string", example: "Dan" },
                lastName: { type: "string", example: "Aby" },
                bio: { type: "string", example: "Node.js developer" },
                avatar: { type: "string", example: "/uploads/new-avatar.jpg" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Профиль обновлён",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Profile" },
            },
          },
        },
        404: {
          description: "Профиль не найден",
        },
      },
    },
    delete: {
      tags: ["Profile"],
      summary: "Удалить мой профиль",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "Профиль удалён",
        },
        500: {
          description: "Ошибка при удалении",
        },
      },
    },
  },
  "/api/profile/avatar": {
    put: {
      tags: ["Avatar"],
      summary: "Обновить аватар профиля",
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                avatar: { type: "string", example: "/uploads/new-avatar.jpg" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Аватар профиля обновлён",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Profile" },
            },
          },
        },
        404: {
          description: "Аватар не найден",
        },
      },
    },
  },
};

export default profilePath;
