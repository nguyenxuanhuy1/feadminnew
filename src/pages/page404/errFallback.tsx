export const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50 p-4 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-2">
        Oops! Đã xảy ra lỗi.
      </h2>
      <p className="text-gray-700 mb-4">
        {error?.message || "Một lỗi không xác định đã xảy ra."}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Thử lại
      </button>
    </div>
  );
};
