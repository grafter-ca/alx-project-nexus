import React from 'react';

interface ButtonProps {
  label: string;               
  onClick?: () => void;          
  className?: string;            
}

function SubscribeButton({label,onClick}: ButtonProps) {
    return (
      <button onClick={onClick} type='submit' className="font-medium text-xl flex items-center justify-center gap-2  rounded-[8px]  px-4 py-1 text-gray-100  bg-green-800 hover:bg-green-600 border border-green-600 hover:text-white cursor-pointer transition duration-500 ease-in-out">
      <span>{label}</span>
    </button>
    );
}


export default SubscribeButton;