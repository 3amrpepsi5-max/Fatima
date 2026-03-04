const Modal = ({ children, onClose, title }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-4 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-right">{title}</h3>
          <button className="px-3 py-1 rounded-md border" onClick={onClose}>إغلاق</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
export default Modal;
