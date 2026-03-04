import { useState, useEffect } from "react";

const AppointmentForm = ({ initial = {}, patients = [], onCancel, onSave }) => {
  const [form, setForm] = useState({
    patientId: initial.patientId || (patients[0] && patients[0].id) || "",
    date: initial.date || "",
    time: initial.time || "",
    reason: initial.reason || ""
  });

  useEffect(() => {
    if (!form.patientId && patients[0]) setForm((s) => ({ ...s, patientId: patients[0].id }));
  }, [patients]);

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="text-right space-y-3">
      <select className="input" value={form.patientId} onChange={handle("patientId")}>
        {patients.map((p) => (
          <option value={p.id} key={p.id}>{p.name}</option>
        ))}
      </select>

      <div className="flex gap-2">
        <input className="input" type="date" value={form.date} onChange={handle("date")} />
        <input className="input" type="time" value={form.time} onChange={handle("time")} />
      </div>

      <input className="input" placeholder="سبب الموعد" value={form.reason} onChange={handle("reason")} />

      <div className="mt-3 flex justify-start gap-2">
        <button className="btn" onClick={() => onSave(form)}>حفظ الموعد</button>
        <button className="px-3 py-2 rounded-md border" onClick={onCancel}>إلغاء</button>
      </div>
    </div>
  );
};

export default AppointmentForm;
