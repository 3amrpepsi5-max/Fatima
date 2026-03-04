const ConfirmDialog = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="text-right">
      <div className="text-sm text-slate-600">{message}</div>
      <div className="mt-4 flex justify-start gap-2">
        <button className="btn" onClick={onConfirm}>نعم</button>
        <button className="px-3 py-2 rounded-md border" onClick={onCancel}>إلغاء</button>
      </div>
    </div>
  );
};
export default ConfirmDialog;
