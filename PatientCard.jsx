const PatientCard = ({ p, onEdit, onDelete, onSelect }) => {
  return (
    <div className="card flex items-center justify-between">
      <div className="text-right cursor-pointer" onClick={() => onSelect(p)}>
        <div className="font-medium">{p.name}</div>
        <div className="text-sm text-slate-500">العمر: {p.age ?? "-"}</div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onEdit(p)}
          className="px-3 py-1 rounded-md border text-sm hover:bg-slate-50/5"
        >
          تعديل
        </button>
        <button
          onClick={() => onDelete(p)}
          className="px-3 py-1 rounded-md text-sm bg-rose-500 text-white"
        >
          حذف
        </button>
      </div>
    </div>
  );
};
export default PatientCard;
