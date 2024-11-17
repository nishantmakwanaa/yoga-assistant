import React from "react";

export default function Tutorials() {
  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col justify-center items-center w-full max-w-4xl text-white px-4 sm:px-8 md:px-16 lg:px-24 py-16 overflow-y-auto">
        <h1 className="text-4xl font-semibold mb-8 text-center">
          Basic Tutorials
        </h1>
        <div className="text-center w-full mx-auto">
          <div className="tutorials-content-container flex flex-col items-center mb-8">
            <p className="tutorials-content text-lg mb-4">
              1. When App Asks For Permission Of Camera, Allow It To Access To
              Capture Pose.
            </p>
            <p className="tutorials-content text-lg mb-4">
              2. Select What Pose You Want To Do In The Dropdown.
            </p>
            <p className="tutorials-content text-lg mb-4">
              3. Read Instructions Of That Pose So You Will Know How To Do That
              Pose.
            </p>
            <p className="tutorials-content text-lg mb-4">
              4. Click On Start Pose And See The Image Of The Pose On The Right
              Side And Replicate That Image In Front Of The Camera.
            </p>
            <p className="tutorials-content text-lg mb-4">
              5. If You Do It Correctly, The Skeleton Over The Video Will Become
              Green In Color And Sound Will Start Playing.
            </p>
          </div>

          <h1 className="text-4xl font-semibold mb-8 text-center">
            Camera Not Working?
          </h1>

          <div className="tutorials-content-container flex flex-col items-center">
            <p className="tutorials-content text-lg mb-4">
              Solution 1: Make Sure You Have Allowed The Permission For The
              Camera. If You Have Denied The Permission, Go To The Settings Of
              Your Browser To Allow The Camera Access For The Application.
            </p>
            <p className="tutorials-content text-lg mb-4">
              Solution 2: Ensure No Other Application Is Accessing The Camera At
              The Same Time. If So, Close That Application.
            </p>
            <p className="tutorials-content text-lg mb-4">
              Solution 3: Try Closing All Other Opened Browsers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
