import { useMemo, useState } from "react";
import { useData } from "../context/DataContext";
import StatCard from "../components/StatCard";
import Topbar from "../components/Topbar";
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import dayjs from "dayjs";

const Dashboard = () => {
  const { patients, appointments, loading } = useData();
  const [rangeDays] = useState(14);

  const chartData = useMemo(() => {
    const days = Array.from({length: rangeDays}).map((_, i) => dayjs().add(i, 'day').format('YYYY-MM-DD'));
    return days.map(d => ({
      date: d,
      appointments: appointments.filter(a => a.date === d).length
    }));
  }, [appointments, rangeDays]);

  return (
    <>
      <Topbar title="لوحة التحكم" />
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <StatCard title="إجمالي المرضى" value={patients.length} />
        <StatCard title="مواعيد مستقبلية" value={appointments.length} />
        <StatCard title="حالات حمل" value={patients.filter(p => p.status === "حامل").length} />
      </div>

      <div className="card">
        <h3 className="text-right mb-2">مواعيد الأيام القادمة</h3>
        <div style={{ height:240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorAppt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopOpacity={0.8} stopColor="#0ea5e9"/>
                  <stop offset="95%" stopOpacity={0} stopColor="#0ea5e9"/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tickFormatter={(d)=> dayjs(d).format('MM/DD')} />
              <YAxis allowDecimals={false} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="appointments" stroke="#0ea5e9" fill="url(#colorAppt)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
