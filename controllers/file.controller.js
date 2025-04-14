import { Profile } from "../models/profile.js";

class FileController {
  async getAll(req, res) {
    try {
      const profiles = await Profile.find();
      if (!profiles) {
        res.status(404).json({ message: "Файлы не найден" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async createAvatar(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Вы не отправили изображение" });
      }

      const { firstName, lastName, bio } = req.body;
      const user = req.userId; 

      const profile = new Profile({
        user,
        firstName,
        lastName,
        bio,
        fileUrl: `/uploads/${req.file.filename}`,
      });

      await profile.save();

      res.status(201).json(file);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async updateAvatar(req, res) {
    try {
      const profile = await Profile.findOne({ user: req.userId });
      if (!profile) {
        return res.status(404).json({ message: "Профиль не найден" });
      }
      if (!req.file) {
        return res.status(400).json({ message: "Файл не был загружен" });
      }
      profile.avatar = `/uploads/${req.file.filename}`;
      await profile.save();
      res.json({ message: "Аватар успешно обновлён", avatar: profile.avatar });
    } catch (error) {
      console.error("Ошибка:", error);
      res
        .status(500)
        .json({ message: "Ошибка сервера при обновлении аватара" });
    }
  }
  async deleteAvatar(req, res) {
    try {
      const profile = await Profile.findOne({ user: req.userId });
      if (!profile) {
        return res.status(404).json({ message: "Профиль не найден" });
      }
      if (!profile.avatar) {
        return res.status(400).json({ message: "Аватар уже удалён" });
      }
      profile.avatar = null;
      await profile.save();

      res.json({ message: "Аватар успешно удалён" });
    } catch (error) {
      console.error("Ошибка:", error);
      res.status(500).json({ message: "Ошибка при удалении аватара" });
    }
  }
}

export default new FileController();
