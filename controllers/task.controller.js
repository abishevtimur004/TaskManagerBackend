import Task from "../models/task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const userId = req.userId;
    const newTask = await Task.create({
      title,
      description,
      status,
      user: userId,
    });
    res.status(201).json(newTask);
    console.log("user from req:", req.user);
  } catch (err) {
    console.log("user from req:", req.user);

    res.status(500).json({ message: "Ошибка при создании задачи" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { user: req.userId };
    if (status) filter.status = status;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении задач" });
  }
};
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: "Задача не найдена" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении задачи" });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, description, status },
      { new: true }
    );
    if (!updatedTask)
      return res.status(404).json({ message: "Задача не найдена" });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при обновлении задачи" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!deletedTask)
      return res.status(404).json({ message: "Задача не найдена" });
    res.json({ message: "Задача удалена" });
  } catch (err) {
    res.status(500).json({ message: "Ошибка при удалении задачи" });
  }
};
