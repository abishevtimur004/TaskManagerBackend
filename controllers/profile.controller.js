import { Profile } from "../models/profile.js";

export const createProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio, avatar } = req.body;
    const existingProfile = await Profile.findOne({ user: req.userId });
    if (existingProfile) {
      return res.status(400).json({ message: "Профиль уже существует" });
    }

    const profile = new Profile({
      user: req.userId,
      firstName,
      lastName,
      bio,
      avatar,
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при создании профиля" });
  }
};

export const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userId }).populate(
      "user",
      "-password"
    );
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Error fetching profile" });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio, avatar } = req.body;
    const profile = await Profile.findOneAndUpdate(
      { user: req.userId },
      { firstName, lastName, bio, avatar },
      { new: true, runValidators: true }
    );
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: "Error updating profile" });
  }
};

export const deleteMyProfile = async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.userId });
    res.json({ message: "Profile deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting profile" });
  }
};
