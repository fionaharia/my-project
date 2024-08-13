"use client"
import React from 'react';
import Image from 'next/image';


type MicPanelProps = {
  onMicClick: () => void;
  onBulbClick: () => void;
};

const MicPanel: React.FC<MicPanelProps> = ({ onMicClick, onBulbClick }) => {
  return (
    <div className="mt-80">
      <div className="flex flex-row justify-center items-center space-x-24">
        <div className="border rounded-full border-1 border-white p-3 cursor-pointer" onClick={onMicClick}>
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
