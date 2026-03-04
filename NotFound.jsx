import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="max-w-xl mx-auto mt-12">
    <div className="card text-right">
      <h2 className="text-lg font-semibold">صفحة غير موجودة (404)</h2>
      <p className="small mt-2">الصفحة التي طلبتها غير موجودة أو تم نقلها.</p>
      <div className="mt-4">
        <Link to="/"><button className="btn">العودة إلى الصفحة الرئيسية</button></Link>
      </div>
    </div>
  </div>
);

export default NotFound;
