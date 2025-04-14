const userSchema = {
  type: "object",
  properties: {
    _id: {
      type: "ObjectId",
    },
    firstName: {
      type: "string",
    },
    lastName: {
      type: "string",
    },
    email: {
      type: "string",
      description: "Email address of user",
      example: "example@mail.kz",
    },
    password: {
      type: "string",
      description: "Hashed password",
    }
  },
};

export default userSchema;