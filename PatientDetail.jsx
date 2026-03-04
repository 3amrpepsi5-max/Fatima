import UploadWidget from "./UploadWidget";

const PatientDetail = ({ patient }) => {
  if (!patient)
    return (
      <div className="card text-right">
        <div className="text-slate-500">اختر مريضًا لعرض التفاصيل</div>
      </div>
    );

  return (
    <div className="card text-right space-y-3">
      <div>
        <h3 className="text-lg font-semibold">{patient.name}</h3>
        <div className="text-sm text-slate-500">العمر: {patient.age ?? "-"}</div>
      </div>

      <div>
        <div className="text-sm text-slate-600">الحالة</div>
        <div className="mt-1 text-sm">{patient.status ?? "-"}</div>
      </div>

      <div>
        <div className="text-sm text-slate-600">ملاحظات</div>
        <div className="mt-1 text-sm whitespace-pre-line">{patient.note ?? "لا توجد ملاحظات"}</div>
      </div>

      <div>
        <div className="text-sm text-slate-600">رفع ملف/صورة</div>
        <div className="mt-2">
          <UploadWidget
            onUploaded={(meta) => {
              alert("تم الرفع: " + meta.url);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default PatientDetail;
