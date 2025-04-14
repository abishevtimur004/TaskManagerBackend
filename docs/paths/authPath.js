const authPaths = {
  "/api/users/register": {
    post: {
      summary: "New user registration",
      tags: ["Auth"],
      responses: {
        201: {
          description: "This route return new user data",
        },
      },
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                firstName: {
                  type: "string",
                  example: "Timur",
                },
                lastName: {
                  type: "string",
                  example: "Abishev",
                },
                email: {
                  type: "string",
                  description: "Адрес электронной почты пользователя",
                  example: "example@mail.kz",
                },
                password: {
                  type: "string",
                  description: "Hashed password",
                  example: "Zaq123456!",
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/users/login": {
    post: {
      summary: "Login user",
      tags: ["Auth"],
      responses: {
        200: {
          description: "This route return JWT",
        },
      },
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  description: "Адрес электронной почты пользователя",
                  example: "example@mail.kz",
                },
                password: {
                  type: "string",
                  description: "Hashed password",
                  example: "Zaq123456!",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default authPaths;
