const profileSchema = {
  type: "object",
  properties: {
    _id: { type: "string", example: "661b3c3a9c44e55c67dcb8a1" },
    user: { type: "string", example: "661b3b8f9c44e55c67dcb89c" },
    firstName: { type: "string", example: "Tests" },
    lastName: { type: "string", example: "Testov" },
    bio: { type: "string", example: "Backend developer" },
    avatar: { type: "string", example: "/uploads/avatar.jpg" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
};

export default profileSchema;
