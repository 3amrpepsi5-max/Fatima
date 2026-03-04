import express from "express";
import { v4 as uuid } from "uuid";
import db from "../db.js";
import { authMiddleware } from "./utils.js";

const router = express.Router();

// GET /api/patients
router.get("/", authMiddleware, (req, res) => {
  const rows = db.prepare("SELECT * FROM patients ORDER BY created_at DESC").all();
  res.json(rows);
});

// POST /api/patients
router.post("/", authMiddleware, (req, res) => {
  const { name, age, status, note } = req.body;
  if (!name) return res.status(400).json({ error: "الاسم مطلوب" });
  const id = uuid();
  db.prepare("INSERT INTO patients (id,name,age,status,note) VALUES (?,?,?,?,?)")
    .run(id, name, age || null, status || null, note || null);
  const patient = db.prepare("SELECT * FROM patients WHERE id = ?").get(id);
  res.status(201).json(patient);
});

// PUT /api/patients/:id
router.put("/:id", authMiddleware, (req, res) => {
  const id = req.params.id;
  const { name, age, status, note } = req.body;
  const exists = db.prepare("SELECT id FROM patients WHERE id = ?").get(id);
  if (!exists) return res.status(404).json({ error: "مريض غير موجود" });

  db.prepare("UPDATE patients SET name=?, age=?, status=?, note=? WHERE id=?")
    .run(name, age || null, status || null, note || null, id);

  const patient = db.prepare("SELECT * FROM patients WHERE id = ?").get(id);
  res.json(patient);
});

// DELETE /api/patients/:id
router.delete("/:id", authMiddleware, (req, res) => {
  const id = req.params.id;
  db.prepare("DELETE FROM patients WHERE id = ?").run(id);
  db.prepare("UPDATE appointments SET patient_id = NULL, patient_name = NULL WHERE patient_id = ?").run(id);
  res.json({ success: true });
});

export default router;
