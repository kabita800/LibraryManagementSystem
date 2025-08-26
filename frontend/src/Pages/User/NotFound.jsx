import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center gap-6 bg-gray-50">
      <h1 className="text-6xl font-extrabold text-red-700 mb-2">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800">
        Oops! Page Not Found
      </h2>
      <p className="text-lg text-gray-500 mb-4 text-center max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Go to Login Page
        </button>
      </div>
    </div>
  );
};

export default NotFound;