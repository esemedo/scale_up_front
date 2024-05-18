import React from "react";

interface SidebarButtonProps {
  isActive: boolean;
  onClick: () => void;
  title: string;
  Icon: React.ElementType;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ isActive, onClick, title, Icon }) => {
  return (
    <button
      onClick={onClick}
      className={`mb-6 ${isActive ? "text-blue-500" : "text-gray-500"}`}
      title={title}
    >
      <Icon className="h-7 w-7 hover:text-blue-500" />
    </button>
  );
};

export default SidebarButton;
