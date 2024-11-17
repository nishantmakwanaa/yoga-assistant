import React from "react";
import { Link } from "react-router-dom";
import homeBanner from "../../assets/home-banner.jpg";

export default function Home() {
  return (
    <div className="relative h-screen bg-gray-100">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${homeBanner})` }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full">
        <h1 className="text-white text-4xl font-semibold mb-8">
          Your Yoga AI Trainer
        </h1>

        {}
        <div className="flex space-x-4">
          <Link to="/start">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg hover:bg-indigo-700 transition-all">
              Let'S Start
            </button>
          </Link>
          <Link to="/tutorials">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg hover:bg-indigo-700 transition-all">
              Tutorials
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}