import { useState } from "react";
import Topbar from "../components/Topbar";
import Modal from "../components/Modal";
import AppointmentForm from "../components/AppointmentForm";
import { useData } from "../context/DataContext";

const Appointments = () => {
  const { appointments, patients, addAppointment, editAppointment, removeAppointment } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  return (
    <>
      <Topbar title="المواعيد" actions={<button className="btn" onClick={()=>{ setEditing(null); setShowForm(true); }}>موعد جديد</button>} />
      <div className="card mt-3">
        <h3 className="text-right mb-3">قائمة المواعيد</h3>
        <div className="space-y-3">
          {appointments.map(a => (
            <div key={a.id} className="card flex items-center justify-between">
              <div className="text-right">
                <div className="font-medium">{a.patient_name}</div>
                <div className="text-sm text-slate-500">{a.date} — {a.time} — {a.reason}</div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-md border" onClick={() => { setEditing(a); setShowForm(true); }}>تعديل</button>
                <button className="px-3 py-1 rounded-md bg-rose-500 text-white" onClick={() => removeAppointment(a.id)}>حذف</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <Modal title={editing ? "تعديل الموعد" : "موعد جديد"} onClose={() => setShowForm(false)}>
          <AppointmentForm
            initial={editing || {}}
            patients={patients}
            onCancel={() => setShowForm(false)}
            onSave={async (data) => {
              try {
                const patient = patients.find(p => p.id === data.patientId);
                const payload = { ...data, patient_name: patient ? patient.name : "غير معروف" };
                if (editing) {
                  await editAppointment(editing.id, payload);
                } else {
                  await addAppointment(payload);
                }
              } catch (err) {
                alert(err?.error || "خطأ");
              } finally {
                setShowForm(false);
              }
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default Appointments;
