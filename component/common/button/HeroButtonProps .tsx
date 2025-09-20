import { Activity } from "lucide-react";

interface HeroButtonProps {
  text: string;
  icon?: React.ReactNode;
  className?: string;
}

const HeroButton = ({ text, icon, className }: HeroButtonProps) => {
  return (
    <button className={`flex items-center space-x-2 bg-green-700 hover:bg-green-600 py-2 px-4 rounded-full ${className}`}>
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

// Usage
<HeroButton text="New Collection Just Dropped" icon={<Activity />} className="absolute right-0 top-[-14px]" />
