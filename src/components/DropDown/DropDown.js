import React, { useState } from "react";
import { poseImages } from "../../utils/pose_images";

export default function DropDown({ poseList, currentPose, setCurrentPose }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-0 focus:shadow-none"
        >
          {currentPose}
        </button>
        {isOpen && (
          <ul
            className="absolute left-0 w-48 bg-white rounded-md shadow-lg z-10 focus:outline-none"
            aria-labelledby="dropdownMenuButton1"
          >
            {poseList.map((pose) => (
              <li
                key={pose}
                onClick={() => {
                  setCurrentPose(pose);
                  setIsOpen(false);
                }}
                className="cursor-pointer hover:bg-indigo-100 flex items-center space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <p className="text-gray-700">{pose}</p>
                  <img
                    src={poseImages[pose]}
                    className="w-8 h-8 rounded-full"
                    alt={pose}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
