import { useState } from "react";
import Topbar from "../components/Topbar";
import PatientCard from "../components/PatientCard";
import PatientForm from "../components/PatientForm";
import PatientDetail from "../components/PatientDetail";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import { useData } from "../context/DataContext";

const Patients = () => {
  const { patients, addPatient, editPatient, removePatient } = useData();
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);

  return (
    <>
      <Topbar
        title="المرضى"
        actions={<button className="btn" onClick={() => { setEditing(null); setShowForm(true); }}>مريض جديد</button>}
      />
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="space-y-3">
            {patients.map(p => (
              <PatientCard
                key={p.id}
                p={p}
                onEdit={(pt) => { setEditing(pt); setShowForm(true); }}
                onDelete={(pt) => setConfirm(pt)}
                onSelect={(pt) => setSelected(pt)}
              />
            ))}
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <PatientDetail patient={selected} />
        </div>
      </div>

      {showForm && (
        <Modal title={editing ? "تعديل مريض" : "مريض جديد"} onClose={() => setShowForm(false)}>
          <PatientForm
            initial={editing || {}}
            onCancel={() => setShowForm(false)}
            onSave={async (data) => {
              try {
                if (editing) {
                  await editPatient(editing.id, data);
                } else {
                  await addPatient(data);
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

      {confirm && (
        <Modal title="تأكيد حذف" onClose={() => setConfirm(null)}>
          <ConfirmDialog
            message={`هل أنت متأكد أنك تريد حذف ${confirm.name}؟ سيتم حذف المواعيد المرتبطة.`}
            onCancel={() => setConfirm(null)}
            onConfirm={async () => {
              await removePatient(confirm.id);
              setConfirm(null);
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default Patients;
