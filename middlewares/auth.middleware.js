import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Токен отсутсвует!" });
  }

  const token = authHeader.replace(/^Bearer\s/, "");

  try {
    // const decoded = jwt.verify(token, "secretkey");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.isManager = decoded.isManager;
    next();
  } catch (error) {
    res.status(401).json({ message: "Невалидный токен" });
  }
}
