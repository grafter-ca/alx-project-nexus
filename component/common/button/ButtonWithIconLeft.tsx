import React from 'react';
import { ComponentType } from "react";

interface ButtonProps {
  label: string;               
  Icon?: ComponentType<any>;     
  onClick?: () => void;          
  className?: string;            
}

function Button({label,Icon}: ButtonProps) {
    return (
      <button className="flex font-medium items-center space-x-2 bg-green-700 hover:bg-green-900 py-3 text-xl px-8 rounded-[8px] text-white transition">
      {Icon && <Icon />} 
      <span>{label}</span>
    </button>
    );
}

export default Button;