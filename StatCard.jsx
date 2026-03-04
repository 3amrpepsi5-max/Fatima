const StatCard = ({ title, value, subtitle }) => {
  return (
    <div className="card flex items-center justify-between">
      <div className="text-right">
        <div className="text-sm text-slate-500">{title}</div>
        <div className="text-2xl font-semibold mt-1">{value}</div>
      </div>
      {subtitle && <div className="text-sm text-slate-400">{subtitle}</div>}
    </div>
  );
};
export default StatCard;
