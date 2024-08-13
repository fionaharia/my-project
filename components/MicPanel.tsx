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
  const [message, setMessage] = useState('');
  const commands = [
    {
      command: 'Hi, I’m really frustrated. My delivery was supposed to arrive yesterday',
      callback: () => setMessage('Hello Alex! I’m sorry to hear about the delay. Let me check the status of your delivery immediately')
    },
  ];

  useEffect(() => {
    // This ensures the code is only run on the client side
    setIsClient(true);
  }, []);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ commands });

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
      console.log('Started listening');
    } else {
      setShowSpeechToText(false);
      SpeechRecognition.stopListening();
      console.log('Stopped listening');
    }
    resetTranscript();
  }, [isListening]);

  useEffect(() => {
    console.log(transcript);
  }, [transcript]);

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
      {message && <p className="message">{message}</p>}
      <div className="flex flex-row justify-center items-center space-x-24">
        <button
          className={`flex items-center space-x-2 py-2 px-4 rounded-full border cursor-pointer transition-colors duration-300 
          ${isListening ? 'bg-white text-black border-black' : 'bg-black text-white border-white'} 
          hover:${isListening ? 'bg-gray-100' : 'bg-gray-800'}`}
          onClick={handleMicClick}
        >
          <Image
            src={isListening ? "/ear.svg" : "/microphone.svg"}
            alt={isListening ? "ear" : "microphone"}
            width={24}
            height={24}
            priority
          />
          <span>{isListening ? 'Listening...' : 'Start speaking'}</span>
        </button>
      </div>
    </div>
  );
};

export default MicPanel;
