import React from "react";

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`flex-grow py-2 text-center ${
        isActive ? "border-b-2 border-blue-500" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default TabButton;
