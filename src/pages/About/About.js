import React from "react";

export default function About() {
  return (
    <div className="relative bg-gray-100">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-white px-4 py-8">
        <h1 className="text-4xl font-semibold mb-8 text-center">About</h1>

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-lg mb-4">
            This is a real-time AI-based yoga trainer that detects how well you're performing your poses. I created this as a personal project, and I have also deployed it so people, especially developers, can learn AI from this project and create their own AI models or improve this one. This is an open-source project. The code is available on GitHub.
          </p>

          <p className="text-lg mb-4">
            This AI predicts keypoints or coordinates of different parts of the body (basically their positions in an image) and uses another classification model to verify if a person is performing a yoga pose correctly. If the AI detects that a pose is being performed with more than 95% probability, it will notify you that you're doing it correctly (by making the virtual skeleton green). I used the TensorFlow pretrained MoveNet model to predict the keypoints, and I built a neural network on top of it that uses these coordinates to classify the yoga pose.
          </p>

          <p className="text-lg mb-4">
            I trained the model in Python, and thanks to TensorFlow.js, we can leverage browser support, so I converted the Keras/TensorFlow model to TensorFlow.js.
          </p>

          <div className="developer-info mt-8">
            <h4 className="text-2xl font-semibold">About The Developer</h4>
            <p className="text-lg mt-4">
              I am Nishant, a full stack developer & AI enthusiast. I love working with technology and sharing my knowledge. I hope this project helps you on your AI journey!
            </p>

            <h4 className="text-2xl font-semibold mt-8">Contact</h4>
            <div className="mt-4">
              <a
                href="https://www.instagram.com/nishantmakwanaa/"
                className="block text-lg text-indigo-400 mb-2"
              >
                Instagram
              </a>
              <a
                href="https://www.youtube.com/channel/nishantworldwide"
                className="block text-lg text-indigo-400 mb-2"
              >
                YouTube
              </a>
              <a
                href="https://github.com/nishantmakwanaa"
                className="block text-lg text-indigo-400 mb-2"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
