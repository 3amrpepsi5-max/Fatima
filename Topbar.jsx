import React from "react";
import { useData } from "../context/DataContext";

const Topbar = ({ title, actions }) => {
  const { user, logout } = useData();

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="small">نظام إدارة العيادة — Dr Fatima PRO</div>
      </div>

      <div className="flex items-center gap-3">
        {actions}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">{user.name}</div>
            <button onClick={() => logout()} className="px-3 py-2 rounded-md border">تسجيل خروج</button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Topbar;
