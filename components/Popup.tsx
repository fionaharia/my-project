"use client"
import React from 'react';

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex  items-center justify-center bg-black bg-opacity-50">
      <div className="bg-black border-1 border-white border p-8 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Pop-Up Content</h2>
        <p>This is the content inside the pop-up.</p>
      </div>
    </div>
  );
};

export default Popup;
