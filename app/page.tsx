'use client'
import 'regenerator-runtime/runtime';
import React, { useState, useRef } from "react";
import MicPanel from "@/components/MicPanel";
import Popup from "@/components/Popup";
import SpeechtoText from "@/components/SpeechtoText";

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

  const handleBulbClick = () => {
    setIsPopupOpen(true); 
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between px-24">
      <div className="absolute top-2 left-2 text-white font-extrabold text-5xl">
        WAL-AI
      </div>
      <div className="relative grid place-items-center w-fit h-fit rounded-full">           
        <video
          ref={videoRef}
          src="/voice_assistant1.mp4" 
          muted
          className="cursor-pointer mt-32 size-[300px] rounded-full"
          loop
          controls={false}
          onClick={handleVideoClick}
        />
        <MicPanel handleVideoClick={handleVideoClick} onBulbClick={handleBulbClick} />
      </div>
      <Popup isOpen={isPopupOpen} onClose={handlePopupClose} />
    </main>
  );
}
