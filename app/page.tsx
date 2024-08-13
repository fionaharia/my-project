'use client'
import React, { useState, useRef } from "react";
import MicPanel from "@/components/MicPanel";
import Popup from "@/components/Popup";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleMicClick = () => {
    handleVideoClick(); // Handle video click for mic
  };

  const handleBulbClick = () => {
    setIsPopupOpen(true); 
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative grid place-items-center w-fit h-fit rounded-full">           
        <video
          ref={videoRef}
          src="/voice_assistant1.mp4" 
          muted
          className="cursor-pointer size-[300px] rounded-full"
          loop
          controls={false}
          onClick={handleVideoClick}
        />
        <MicPanel onMicClick={handleMicClick} onBulbClick={handleBulbClick} />
      </div>
      <Popup isOpen={isPopupOpen} onClose={handlePopupClose} />
    </main>
  );
}
