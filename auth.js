import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import db from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || "7d";

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "الحقول مطلوبة" });

    const exist = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
    if (exist) return res.status(409).json({ error: "البريد مستخدم بالفعل" });

    const hashed = await bcrypt.hash(password, 10);
    const id = uuid();
    db.prepare("INSERT INTO users (id,name,email,password) VALUES (?,?,?,?)").run(id, name, email, hashed);

    const token = jwt.sign({ userId: id, email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
    res.json({ token, user: { id, name, email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطأ داخلي" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: "الحقول مطلوبة" });

    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!user) return res.status(401).json({ error: "بيانات دخول غير صحيحة" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "بيانات دخول غير صحيحة" });

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطأ داخلي" });
  }
});

export default router;
