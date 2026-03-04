import { useState } from "react";
import { useData } from "../context/DataContext";

const UploadWidget = ({ onUploaded }) => {
  const { token } = useData();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const API = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const submit = async () => {
    if (!file) return alert("اختر ملفاً");
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch(`${API}/api/uploads`, {
        method: "POST",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
        body: fd
      });
      const data = await res.json();
      if (!res.ok) throw data;
      onUploaded && onUploaded(data);
    } catch (err) {
      console.error(err);
      alert(err?.error || err?.message || "فشل الرفع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button className="btn" onClick={submit} disabled={!file || loading}>
        {loading ? "جارٍ..." : "رفع"}
      </button>
    </div>
  );
};

export default UploadWidget;
