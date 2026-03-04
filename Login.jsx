import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useData } from "../context/DataContext";

const Login = () => {
  const { login, register } = useData();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.email || !form.password || (mode === "register" && !form.name)) {
      setError("يرجى تعبئة كل الحقول المطلوبة");
      return;
    }
    try {
      setLoading(true);
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
      } else {
        await register({ name: form.name, email: form.email, password: form.password });
      }
      nav(from, { replace: true });
    } catch (err) {
      setError(err?.error || err?.message || "حصل خطأ أثناء الاتصال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">{mode === "login" ? "تسجيل الدخول" : "إنشاء حساب"}</h2>
            <p className="small mt-1">إدارة العيادة — سجّل دخولك للمتابعة.</p>
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === "register" && (
              <input className="input" placeholder="الاسم" value={form.name} onChange={handle("name")} />
            )}
            <input className="input" placeholder="البريد الإلكتروني" value={form.email} onChange={handle("email")} />
            <input className="input" placeholder="كلمة المرور" type="password" value={form.password} onChange={handle("password")} />
            {error && <div className="text-red-600 text-sm">{error}</div>}

            <div className="flex items-center gap-3">
              <button type="submit" className="btn" disabled={loading}>
                {loading ? "جارٍ..." : mode === "login" ? "دخول" : "إنشاء حساب"}
              </button>
              <button
                type="button"
                className="px-3 py-2 rounded-md border"
                onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(null); }}
              >
                {mode === "login" ? "إنشاء حساب" : "لدي حساب"}
              </button>
            </div>
          </form>

          <div className="mt-4 small">
            إذا واجهت مشاكل، افتح Console أو راجع Backend.
          </div>
        </div>

        <div className="text-center mt-6 small text-gray-500">
          © {new Date().getFullYear()} Dr Fatima — PRO
        </div>
      </div>
    </div>
  );
};

export default Login;
