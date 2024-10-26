// src/shared/components/LoadingSpinner.tsx
const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"></div>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  };
  
  export { LoadingSpinner };