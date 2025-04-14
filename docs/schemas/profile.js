const profileSchema = {
  type: "object",
  properties: {
    _id: { type: "string" },
    user: { type: "string"},
    firstName: { type: "string", example: "Tests" },
    lastName: { type: "string", example: "Testov" },
    bio: { type: "string", example: "Backend developer" },
    avatar: { type: "string", example: "/uploads/avatar.jpg" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
  },
};

export default profileSchema;
