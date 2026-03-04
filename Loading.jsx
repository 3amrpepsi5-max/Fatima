const Loading = ({ message = "جارٍ التحميل..." }) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="mb-2">
          <svg width="36" height="36" viewBox="0 0 50 50" aria-hidden>
            <path fill="#0ea5e9" d="M43.935,25.145c0-10.318-8.364-18.682-18.682-18.682c-10.318,0-18.682,8.364-18.682,18.682h4.068 c0-8.073,6.541-14.614,14.614-14.614c8.073,0,14.614,6.541,14.614,14.614H43.935z">
              <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.9s" repeatCount="indefinite"/>
            </path>
          </svg>
        </div>
        <div className="small">{message}</div>
      </div>
    </div>
  );
};

export default Loading;
