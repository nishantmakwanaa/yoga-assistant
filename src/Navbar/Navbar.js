import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-200 shadow-lg">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-indigo-500 text-2xl font-bold">
          AlignAware
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-indigo-500">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-500">
            About
          </Link>
          <Link to="/start" className="text-gray-700 hover:text-indigo-500">
            Start
          </Link>
          <Link to="/tutorials" className="text-gray-700 hover:text-indigo-500">
            Tutorials
          </Link>
        </div>
        <button className="md:hidden text-gray-700" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <div
        className={`md:hidden ${isOpen ? "block" : "hidden"} bg-gray-200 py-4`}
      >
        <div className="flex flex-col items-center space-y-4">
          <Link to="/" className="text-gray-700 hover:text-indigo-500">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-500">
            About
          </Link>
          <Link to="/start" className="text-gray-700 hover:text-indigo-500">
            Start
          </Link>
          <Link to="/tutorials" className="text-gray-700 hover:text-indigo-500">
            Tutorials
          </Link>
        </div>
      </div>
    </nav>
  );
}
