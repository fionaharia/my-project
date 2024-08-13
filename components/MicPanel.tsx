"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Ear from "@/icons/Ear";
import Mic from "@/icons/Mic";

type MicPanelProps = {
  handleVideoClick: () => void;
  onBulbClick: () => void;
};

const MicPanel = ({ handleVideoClick, onBulbClick} : MicPanelProps) => {
  const [isClient, setIsClient] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading

  const commands = [
    {
      command:
        "Hi, I’m really frustrated. My delivery was supposed to arrive yesterday",
      callback: () => {
        setLoading(true);
        setMessage(
          "Hello Alex! I’m sorry to hear about the delay. Let me check the status of your delivery immediately"
        );
      },
      isFuzzyMatch: true,
    },
    {
      command: "What is the update?",
      callback: () => {
        setLoading(true);
        setMessage(
          "I’ve found your order. Your package is currently in transit and is expected to arrive tomorrow."
        );
      },
      isFuzzyMatch: true,
    },
    {
      command: "Thank you for the quick response. This helps a lot!",
      callback: () => {
        setLoading(true);
        setMessage(
          "You’re welcome, Alex! If you have any more questions or need further assistance, just let me know. Have a great day!"
        );
      },
      isFuzzyMatch: true,
    },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  const [showSpeechToText, setShowSpeechToText] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleMicClick = () => {
    handleVideoClick();
    setIsListening((prevState) => !prevState);
  };

  useEffect(() => {
    if (isListening) {
      setShowSpeechToText(true);
      setMessage(""); // Clear previous message when starting to listen
      setLoading(false); // Hide loading indicator when starting to listen
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
      console.log("Started listening");
    } else {
      setShowSpeechToText(false);
      SpeechRecognition.stopListening();
      console.log("Stopped listening");
    }
    resetTranscript();
  }, [isListening]);

  useEffect(() => {
    console.log("Transcript:", transcript);
  }, [transcript]);

  useEffect(() => {
    if (message) {
      // Show loading indicator before showing the message
      const timer = setTimeout(() => {
        setLoading(false); // Hide loading indicator
        setShowSpeechToText(false); // Hide speech to text
        setIsListening(false); // Reset listening state
        handleVideoClick();
      }, 1000); // Adjust the delay if needed

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!isClient) {
    return null;
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="lg:mt-12 mt-10">
      <div className="h-[90px] overflow-auto grid place-items-center px-2 custom-scrollbar">
        {showSpeechToText && !message && <p className="text-center text-sm font-semibold capitalize">{transcript}</p>}{" "}
        {/* Show transcript only when there's no message */}
        {message && !loading && <p className="message text-center text-sm font-semibold capitalize">{message}</p>}{" "}
        {/* Show message only when not loading */}
      </div>
      <div className="flex flex-row mt-8 justify-center items-center space-x-24">
        <button
          className={`text-white flex items-center space-x-2 py-2 px-4 rounded-full cursor-pointer transition-colors duration-300 
          ${isListening && !loading ? " bg-green-500" : "bg-[#016dea]"}
          ${loading && "bg-gray-400 hover:shadow-none"} 
          ${(isListening && !loading) ? "hover:shadow-[0_0_15px_10px_rgba(34,197,94,0.3)]" : "hover:shadow-[0_0_15px_10px_rgba(1,109,234,0.3)]"}`}
          onClick={handleMicClick}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <></>
          ) : isListening ? (
            <Ear width={24} height={24} />
          ) : (
            <Mic width={24} height={24} />
          )}
          <span>
            {loading ? "Thinking..." : (isListening ? "Listening..." : "Start speaking")}
          </span>
        </button>
      </div>
    </div>
  );
};

export default MicPanel;
