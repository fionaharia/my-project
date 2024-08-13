"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


type MicPanelProps = {
  handleVideoClick: () => void;
  onBulbClick: () => void;
};

const MicPanel: React.FC<MicPanelProps> = ({ handleVideoClick, onBulbClick }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures the code is only run on the client side
    setIsClient(true);
  }, []);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [showSpeechToText, setShowSpeechToText] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleMicClick = () => {
    handleVideoClick(); // Handle video click for mic
    setIsListening(!isListening);
  };

  useEffect(() => {
    if (isListening) {
      setShowSpeechToText(true);
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
      console.log('Started listening')
    } else {
      setShowSpeechToText(false);
      SpeechRecognition.stopListening();
      console.log('Stopped listening')
    }
    resetTranscript();
  }, [isListening]);

  useEffect(() => {
    console.log(transcript);
  },[transcript]);

  if (!isClient) {
    // Avoid rendering browser-dependent content on the server
    return null;
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="mt-40">
      {showSpeechToText && <p>{transcript}</p>}
      <div className="flex flex-row justify-center items-center space-x-24">
        <div className="border rounded-full border-1 border-white p-3 cursor-pointer" onClick={handleMicClick}>
          <Image
            src="/microphone.svg"
            alt="microphone"
            width={24}
            height={24}
            priority
          />
        </div>
        <div className="border rounded-full border-1 border-white p-3 cursor-pointer" onClick={onBulbClick}>
          <Image
            src="/bulb.svg"
            alt="bulb"
            width={24}
            height={24}
          />
        </div>
      </div>
    </div>
  );
};

export default MicPanel;