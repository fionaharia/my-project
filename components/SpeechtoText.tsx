'use client';
import 'regenerator-runtime/runtime';
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechtoText: React.FC = () => {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // Start listening automatically when component mounts
  React.useEffect(() => {
    SpeechRecognition.startListening();
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  return (
    <div>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechtoText;
