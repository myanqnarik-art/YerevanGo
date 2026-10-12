import React, { useState } from 'react';
import { UserProfile } from '../types';
import { X, Mail, Lock, Phone, User, CheckCircle2, ShieldCheck, Car } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onLoginSuccess,
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<'driver' | 'passenger' | 'both'>('both');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === 'login') {
      if (!email || !password) {
        setError('Լրացրեք էլ․ փոստը և գաղտնաբառը');
        return;
      }
      // Demo login
      const loggedUser: UserProfile = {
        id: 'usr_arman_01',
        name: 'Արման',
        surname: 'Սարգսյան',
        email: email || 'arman.sargsyan@yerevan.am',
        phone: '+374 98 44 22 10',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        role: 'both',
        rating: 4.9,
        tripsCount: 24,
        successfulMatches: 18,
        memberSince: 'Մարտ 2024',
        vehicle: {
          model: 'Toyota Prius',
          color: 'Սպիտակ',
          plateNumber: '35 XX 333',
          year: 2018,
        },
        reviews: [],
      };
      onLoginSuccess(loggedUser);
      onClose();
    } else {
      if (!name || !surname || !email || !phone || !password) {
        setError('Լրացրեք բոլոր պարտադիր դաշտերը');
        return;
      }
      const newUser: UserProfile = {
        id: `usr_${Date.now()}`,
        name,
        surname,
        email,
        phone,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
        role,
        rating: 5.0,
        tripsCount: 0,
        successfulMatches: 0,
        memberSince: 'Հոկտեմբեր 2026',
        vehicle:
          role === 'driver' || role === 'both'
            ? {
                model: 'Toyota Corolla',
                color: 'Սպիտակ',
                plateNumber: '01 XX 001',
                year: 2020,
              }
            : undefined,
        reviews: [],
      };
      onLoginSuccess(newUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Tabs */}
        <div className="flex border-b border-slate-100 relative">
          <button
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-4 text-xs sm:text-sm font-bold text-center transition-colors cursor-pointer ${
              mode === 'login'
                ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50/20'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Մուտք գործել
          </button>

          <button
            onClick={() => {
              setMode('register');
              setError(null);
            }}
            className={`flex-1 py-4 text-xs sm:text-sm font-bold text-center transition-colors cursor-pointer ${
              mode === 'register'
                ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50/20'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Ստեղծել հաշիվ
          </button>

          <button
            onClick={onClose}
            className="absolute right-3 top-3.5 p-1.5 text-slate-400 hover:text-slate-700 rounded-xl"
            aria-label="Փակել"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs">
              {error}
            </div>
          )}

          {mode === 'register' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Անուն *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Արման"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ազգանուն *</label>
                  <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="Սարգսյան"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  Հեռախոսահամար *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+374 98 00 00 00"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500"
                />
              </div>

              {/* Role choice */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Ես YerevanGo-ում՝
                </label>
                <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold text-center">
                  <button
                    type="button"
                    onClick={() => setRole('passenger')}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      role === 'passenger'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    Ես ուղևոր եմ
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('driver')}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      role === 'driver'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    Ես վարորդ եմ
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('both')}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      role === 'both'
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    Երկուսն էլ
                  </button>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              Էլ․ փոստ *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              Գաղտնաբառ *
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 text-xs sm:text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-md shadow-orange-600/25 transition-all cursor-pointer"
            >
              {mode === 'login' ? 'Մուտք գործել' : 'Գրանցվել'}
            </button>
          </div>

          {/* Quick Demo Fill */}
          <div className="pt-2 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => {
                setEmail('arman.sargsyan@yerevan.am');
                setPassword('password123');
              }}
              className="text-[11px] text-slate-500 hover:text-orange-600 font-medium underline"
            >
              Լրացնել Դեմո օգտատիրոջ տվյալներով (Արման)
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
