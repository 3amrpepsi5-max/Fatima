import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ message }) => {
  const nav = useNavigate();
  return (
    <div className="max-w-xl mx-auto mt-12">
      <div className="card text-right">
        <h2 className="text-lg font-semibold">حدث خطأ</h2>
        <p className="small mt-2">{message || "حدث خطأ غير متوقع."}</p>
        <div className="mt-4 flex gap-2">
          <button className="btn" onClick={() => nav(-1)}>العودة</button>
          <button className="px-3 py-2 rounded-md border" onClick={() => nav("/")}>الصفحة الرئيسية</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
