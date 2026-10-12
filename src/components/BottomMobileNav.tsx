import React from 'react';
import { Home, Search, Car, Bell, User } from 'lucide-react';

interface BottomMobileNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  unreadCount: number;
}

export const BottomMobileNav: React.FC<BottomMobileNavProps> = ({
  currentView,
  onNavigate,
  unreadCount,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg">
      <div className="grid grid-cols-5 gap-1">
        
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center py-1.5 transition-colors ${
            currentView === 'home' ? 'text-orange-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Գլխավոր</span>
        </button>

        <button
          onClick={() => onNavigate('rides')}
          className={`flex flex-col items-center justify-center py-1.5 transition-colors ${
            currentView === 'rides' ? 'text-orange-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Որոնել</span>
        </button>

        <button
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center justify-center py-1.5 transition-colors ${
            currentView === 'dashboard' ? 'text-orange-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Car className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Երթեր</span>
        </button>

        <button
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center justify-center py-1.5 relative transition-colors ${
            currentView === 'notifications' ? 'text-orange-600 font-bold' : 'text-slate-500'
          }`}
        >
          <Bell className="w-5 h-5 mb-0.5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-3 w-3.5 h-3.5 bg-orange-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          <span className="text-[10px]">Ծանուցում</span>
        </button>

        <button
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center justify-center py-1.5 transition-colors ${
            currentView === 'profile' ? 'text-orange-600 font-bold' : 'text-slate-500'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Պրոֆիլ</span>
        </button>

      </div>
    </div>
  );
};
