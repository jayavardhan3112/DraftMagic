import React from "react";
// import Button from "../components/Button";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex flex-col justify-center items-center">
      <div className="max-w-3xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to My App
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Start composing your message with AI magic!
        </p>
        <Link
          to="/compose"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
