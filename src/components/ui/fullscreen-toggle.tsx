"use client";

import React, { useState } from "react";

const FullscreenToggle: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      alert(`Error attempting to enable fullscreen mode: ${(err as Error).message}`);
    }
  };

  return (
    <button onClick={toggleFullscreen} className="ml-52 py-2 px-4 text-amber-200 rounded-lg hover:text-amber-400 transition">
      {isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    </button>
  );
};

export default FullscreenToggle;