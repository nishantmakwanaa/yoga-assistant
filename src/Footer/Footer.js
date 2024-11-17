import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-200 shadow-lg py-4">
      <div className="container mx-auto px-4 md:px-8 flex justify-center items-center">
        {}
        <span className="text-gray-700">
          &copy; {new Date().getFullYear()} AlignAware. All rights reserved.
        </span>
      </div>
    </footer>
  );
}