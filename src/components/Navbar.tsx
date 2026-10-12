import React, { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo';
import { AppNotification, UserProfile } from '../types';
import { 
  Bell, 
  PlusCircle, 
  User, 
  Menu, 
  X, 
  Check, 
  LogOut, 
  Car, 
  Calendar,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  currentUser: UserProfile | null;
  notifications: AppNotification[];
  onOpenCreateRide: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onLogout: () => void;
  onMarkNotificationsRead: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  currentUser,
  notifications,
  onOpenCreateRide,
  onOpenAuth,
  onLogout,
  onMarkNotificationsRead,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Գլխավոր' },
    { id: 'rides', label: 'Ուղևորություններ' },
    { id: 'how-it-works', label: 'Ինչպես է աշխատում' },
    { id: 'safety', label: 'Մեր մասին' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4 md:gap-8">
          
          {/* Zone 1: Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            className="cursor-pointer shrink-0 py-1"
          >
            <Logo size="md" />
          </div>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`whitespace-nowrap transition-colors py-1 cursor-pointer ${
                  currentView === link.id
                    ? 'text-orange-600 font-semibold'
                    : 'hover:text-slate-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Create Ride Button */}
            <button
              onClick={onOpenCreateRide}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 rounded-xl transition-all shadow-xs hover:shadow-orange-500/25 shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Ստեղծել ուղևորություն</span>
              <span className="sm:hidden">Ստեղծել</span>
            </button>

            {/* Notifications Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => {
                  setNotifOpen(!notifOpen);
                  if (!notifOpen && unreadCount > 0) {
                    onMarkNotificationsRead();
                  }
                }}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                title="Ծանուցումներ"
                aria-label="Ծանուցումներ"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-orange-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50">
                  <div className="flex items-center justify-between px-4 pb-3 border-b border-slate-100">
                    <span className="font-semibold text-slate-900 text-sm">Ծանուցումներ</span>
                    <button
                      onClick={onMarkNotificationsRead}
                      className="text-xs text-orange-600 hover:text-orange-700 font-medium cursor-pointer"
                    >
                      Նշել բոլորը որպես կարդացված
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-sm text-slate-500">
                        Նոր ծանուցումներ չկան
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3.5 hover:bg-slate-50 transition-colors ${
                            !notif.read ? 'bg-orange-50/40' : ''
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-slate-900 leading-snug">
                                {notif.title}
                              </p>
                              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                                {notif.message}
                              </p>
                              <span className="text-[11px] text-slate-400 mt-1 block">
                                {notif.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Auth / Profile Area */}
            {currentUser ? (
              <div className="relative" ref={userRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <span className="hidden sm:inline text-xs font-semibold text-slate-800">
                    {currentUser.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:inline" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900">
                        {currentUser.name} {currentUser.surname}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        onNavigate('dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <Car className="w-4 h-4 text-orange-600" />
                      Իմ ուղևորությունները & Կաբինետ
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('profile');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      Պրոֆիլ
                    </button>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          onLogout();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Ելք համակարգից
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                >
                  Մուտք
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="hidden sm:inline-block px-3 py-1.5 text-xs font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Գրանցվել
                </button>
              </div>
            )}

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Մենյու"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentView === link.id
                    ? 'bg-orange-50 text-orange-600 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}

            {currentUser && (
              <>
                <button
                  onClick={() => {
                    onNavigate('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <Car className="w-4 h-4 text-orange-600" />
                  Իմ ուղևորությունները & Կաբինետ
                </button>
                <button
                  onClick={() => {
                    onNavigate('profile');
                    setMobileMenuOpen(false);
                  }}
                  className="text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  Իմ պրոֆիլը
                </button>
              </>
            )}
          </nav>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {!currentUser ? (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl"
                >
                  Մուտք
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-center text-xs font-semibold text-white bg-slate-900 rounded-xl"
                >
                  Գրանցվել
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-center text-xs font-medium text-rose-600 bg-rose-50 rounded-xl"
              >
                Ելք համակարգից
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
