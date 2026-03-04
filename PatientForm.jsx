import { useState } from "react";

const PatientForm = ({ initial = {}, onCancel, onSave }) => {
  const [form, setForm] = useState({
    name: initial.name || "",
    age: initial.age || "",
    status: initial.status || "متابعة",
    note: initial.note || ""
  });

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="text-right">
      <div className="space-y-3">
        <input className="input" placeholder="الاسم" value={form.name} onChange={handle("name")} />
        <input className="input" placeholder="العمر" value={form.age} onChange={handle("age")} />
        <select className="input" value={form.status} onChange={handle("status")}>
          <option>متابعة</option>
          <option>حامل</option>
          <option>جديد</option>
        </select>
        <textarea className="input" placeholder="ملاحظات" value={form.note} onChange={handle("note")} rows={4} />
      </div>

      <div className="mt-4 flex justify-start gap-2">
        <button className="btn" onClick={() => onSave(form)}>حفظ</button>
        <button className="px-3 py-2 rounded-md border" onClick={onCancel}>إلغاء</button>
      </div>
    </div>
  );
};

export default PatientForm;
