import express from "express";
import { v4 as uuid } from "uuid";
import db from "../db.js";
import { authMiddleware } from "./utils.js";

const router = express.Router();

// GET /api/appointments
router.get("/", authMiddleware, (req, res) => {
  const rows = db.prepare("SELECT * FROM appointments ORDER BY date, time").all();
  res.json(rows);
});

// POST /api/appointments
router.post("/", authMiddleware, (req, res) => {
  const { patient_id, patient_name, date, time, reason } = req.body;
  if (!date || !time) return res.status(400).json({ error: "date و time مطلوبان" });

  const id = uuid();
  db.prepare(`INSERT INTO appointments (id, patient_id, patient_name, date, time, reason) VALUES (?,?,?,?,?,?)`)
    .run(id, patient_id || null, patient_name || null, date, time, reason || null);

  const appointment = db.prepare("SELECT * FROM appointments WHERE id = ?").get(id);
  res.status(201).json(appointment);
});

// PUT /api/appointments/:id
router.put("/:id", authMiddleware, (req, res) => {
  const id = req.params.id;
  const { patient_id, patient_name, date, time, reason } = req.body;
  const exists = db.prepare("SELECT id FROM appointments WHERE id = ?").get(id);
  if (!exists) return res.status(404).json({ error: "موعد غير موجود" });

  db.prepare(`UPDATE appointments SET patient_id=?, patient_name=?, date=?, time=?, reason=? WHERE id=?`)
    .run(patient_id || null, patient_name || null, date, time, reason || null, id);

  const appointment = db.prepare("SELECT * FROM appointments WHERE id = ?").get(id);
  res.json(appointment);
});

// DELETE /api/appointments/:id
router.delete("/:id", authMiddleware, (req, res) => {
  const id = req.params.id;
  db.prepare("DELETE FROM appointments WHERE id = ?").run(id);
  res.json({ success: true });
});

export default router;
