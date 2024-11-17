import React, { useState } from "react";

import { poseInstructions } from "../../utils/data";
import { poseImages } from "../../utils/pose_images";

export default function Instructions({ currentPose }) {
  const [instructions] = useState(poseInstructions);

  return (
    <div className="flex flex-col items-center space-y-8 py-8">
      <ul className="space-y-4 text-lg list-inside max-w-3xl mx-auto">
        {instructions[currentPose].map((instruction, index) => (
          <li key={index} className="text-gray-700">
            {instruction}
          </li>
        ))}
      </ul>

      <img
        className="w-full max-w-md rounded-lg shadow-lg"
        src={poseImages[currentPose]}
        alt={`Pose for ${currentPose}`}
        style={{ maxHeight: "400px", objectFit: "contain" }}
      />
    </div>
  );
}
