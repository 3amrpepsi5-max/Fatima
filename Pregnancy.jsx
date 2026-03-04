import Topbar from "../components/Topbar";
import { useData } from "../context/DataContext";

const Pregnancy = () => {
  const { patients } = useData();
  const moms = patients.filter(p => p.status === "حامل");

  return (
    <>
      <Topbar title="متابعة الحمل" />
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {moms.length === 0 && <div className="card text-right">لا توجد حالات حمل حالياً</div>}
        {moms.map(m => (
          <div className="card text-right" key={m.id}>
            <h4 className="font-semibold">{m.name}</h4>
            <div className="text-sm text-slate-500 mt-1">{m.note}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Pregnancy;
