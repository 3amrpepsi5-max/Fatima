import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const DB_FILE = process.env.DB_FILE || path.resolve(process.cwd(), "drfatima.db");
const needCreate = !fs.existsSync(DB_FILE);

const db = new Database(DB_FILE);

// إنشاء الجداول الأساسية (بدون بيانات وهمية)
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS patients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER,
  status TEXT,
  note TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS appointments (
  id TEXT PRIMARY KEY,
  patient_id TEXT,
  patient_name TEXT,
  date TEXT,
  time TEXT,
  reason TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY(patient_id) REFERENCES patients(id) ON DELETE SET NULL
);
`);

export default db;
