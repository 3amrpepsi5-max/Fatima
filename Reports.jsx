import { useMemo } from "react";
import Topbar from "../components/Topbar";
import { useData } from "../context/DataContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0ea5e9", "#f97316", "#10b981", "#ef4444"];

const Reports = () => {
  const { patients, appointments } = useData();

  const patientByStatus = useMemo(() => {
    const map = {};
    patients.forEach(p => map[p.status] = (map[p.status] || 0) + 1);
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [patients]);

  const downloadCSV = (filename, rows) => {
    if (!rows.length) return alert("لا بيانات للتصدير");
    const csv = [Object.keys(rows[0]).join(","), ...rows.map(r => Object.values(r).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  return (
    <>
      <Topbar title="التقارير" />
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="card">
          <h3 className="text-right mb-2">حالة المرضى</h3>
          <div style={{ height:240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={patientByStatus} dataKey="value" nameKey="name" outerRadius={80} label>
                  {patientByStatus.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3">
            <button className="btn" onClick={() => downloadCSV("patients.csv", patients)}>تصدير المرضى CSV</button>
          </div>
        </div>

        <div className="card">
          <h3 className="text-right mb-2">مواعيد (قائمة)</h3>
          <div style={{ maxHeight:300, overflow:"auto" }} className="space-y-2">
            {appointments.map(a => (
              <div key={a.id} className="p-2 border rounded">
                <div className="font-medium">{a.patient_name}</div>
                <div className="text-sm text-slate-500">{a.date} — {a.time} — {a.reason}</div>
              </div>
            ))}
          </div>
          <div className="mt-3">
            <button className="btn" onClick={() => downloadCSV("appointments.csv", appointments)}>تصدير المواعيد CSV</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
