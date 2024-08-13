"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import SpeechtoText from './SpeechtoText';
import Ear from '@/icons/Ear';
import Mic from '@/icons/Mic';

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
      callback: () => setMessage('Hello Alex! I’m sorry to hear about the delay. Let me check the status of your delivery immediately'),
      isFuzzyMatch: true
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

  useEffect(() => {
    setShowSpeechToText(false)
    setIsListening(false)
  }, [message])

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
          className={`text-white flex items-center space-x-2 py-2 px-4 rounded-full cursor-pointer transition-colors duration-300 
          ${isListening ? ' bg-green-500' : 'bg-[#016dea]'} 
          hover:${isListening ? 'shadow-[0_0_15px_0_rgba(34,197,94,0.5)]' : 'shadow-[0_0_15px_0_rgba(1,109,234,0.5)]'}`}
          onClick={handleMicClick}
        >
          {isListening ? 
            <Ear width={24} height={24}/> : <Mic width={24} height={24}/>
          }
          <span>{isListening ? 'Listening...' : 'Start speaking'}</span>
        </button>
      </div>
    </div>
  );
};

export default MicPanel;
