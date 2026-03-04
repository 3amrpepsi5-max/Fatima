import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "لوحة التحكم" },
  { to: "/patients", label: "المرضى" },
  { to: "/appointments", label: "المواعيد" },
  { to: "/pregnancy", label: "متابعة الحمل" },
  { to: "/reports", label: "التقارير" }
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white p-4 hidden md:block">
      <div className="mb-6">
        <h1 className="text-xl font-bold">د. فاطمة</h1>
        <div className="text-sm text-slate-300 mt-1">نظام العيادة — PRO</div>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((i) => (
          <NavLink
            key={i.to}
            to={i.to}
            end={i.to === "/"}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition-all text-right ${
                isActive ? "bg-slate-800 text-primary" : "text-slate-200 hover:bg-slate-800"
              }`
            }
          >
            {i.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 text-sm text-slate-400">
        <div>الإصدار: PRO</div>
        <div className="mt-2">© {new Date().getFullYear()}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
