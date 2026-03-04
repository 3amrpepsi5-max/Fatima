import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { authMiddleware } from "./utils.js";

// تأكد من وجود مجلد uploads
const UPLOAD_DIR = path.resolve(process.cwd(), "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`;
    cb(null, name);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const router = express.Router();

/**
 * POST /api/uploads
 * header: Authorization: Bearer <token>
 * form-data: file (field name 'file')
 */
router.post("/", authMiddleware, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "لا يوجد ملف" });
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ filename: req.file.filename, url: fileUrl, originalname: req.file.originalname });
});

export default router;
