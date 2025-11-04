import { User } from 'lucide-react'; // For the icon; install lucide-react if needed

interface TabButtonProps {
  label: string;
  isActive: boolean;
  icon?: React.ReactNode; // Optional icon (e.g., User for profile)
  onClick: () => void;
}

export function TabButton({ label, isActive, icon, onClick }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-between px-4 py-3 text-sm font-medium  transition-all duration-200
        ${
          isActive
            ? 'bg-white border-b-black text-gray-900 border-b-2 border-gray-300 shadow-sm' 
            : 'bg-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50' 
        }
      `}
      aria-label={label} 
    >
      <span>{label}</span>
      {icon && <span className="ml-2 text-purple-500">{icon}</span>} 
    </button>
  );
}