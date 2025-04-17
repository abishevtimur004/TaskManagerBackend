import "../config.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Profile } from "../models/profile.js";
import { hashPassword, comparePasswords } from "../utils/bcrypt.js";

const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET:", JWT_SECRET);

export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Пользователь уже существует" });
    }

    const hashedPassword = await hashPassword(password);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();

    const profile = new Profile({
      user: user._id,
      firstName,
      lastName,
    });
    await profile.save();

    return res.status(201).json({
      message: "Пользователь успешно зарегистрирован",
      user,
      token,
    });
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    console.error(error.stack);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ error: "Ошибка при создании пользователя" });
    }
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Неверный e-mail или пароль" });
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ error: "Неверный e-mail или пароль" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({ token });
  } catch (error) {
    console.error("Ошибка входа:", error.message);
    res.status(500).json({ error: "Error logging in" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении пользователя" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      updates.password = await hashPassword(updates.password);
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId, updates, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при обновлении пользователя" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.userId);
    if (!deletedUser) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    res.json({ message: "Пользователь успешно удалён" });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при удалении пользователя" });
  }
};
