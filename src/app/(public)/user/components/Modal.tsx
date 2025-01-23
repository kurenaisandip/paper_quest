import React from "react";

const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close the modal when clicking on the backdrop
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 xl:w-[450px] relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
