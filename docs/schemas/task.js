// taskSchema.js
const taskSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      example: "Тренировка",
    },
    description: {
      type: "string",
      example: "Работа с грудными и трицепсом",
    },
    status: {
      type: "string",
      enum: ["not_started", "in_progress", "completed"],
      example: "not_started",
    },
    user: {
      type: "string",
      description: "ID пользователя, который создал задачу",
      example: "60b5edba4a4d5f30f8c3ef3b",
    },
    createdAt: {
      type: "string",
      format: "date-time",
      example: "2021-06-15T18:30:00Z",
    },
  },
  required: ["title", "user"],
};

export default taskSchema;
