import React, { useState } from 'react';
import { Ride } from '../types';
import { Users, X, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface JoinRequestModalProps {
  ride: Ride | null;
  onClose: () => void;
  onConfirm: (ride: Ride, seats: number, notes: string) => void;
}

export const JoinRequestModal: React.FC<JoinRequestModalProps> = ({
  ride,
  onClose,
  onConfirm,
}) => {
  if (!ride) return null;

  const [seats, setSeats] = useState(1);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onConfirm(ride, seats, notes);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">
            Միանալու հարցում
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Հարցումն ուղարկված է։
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Վարորդը ({ride.driver.name}) կստանա ձեր հարցումը և կհաստատի այն։
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            
            <div className="text-center">
              <p className="text-base font-semibold text-slate-900">
                Ցանկանո՞ւմ եք միանալ այս ուղևորությանը։
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {ride.from.district} → {ride.to.district} ({ride.time}, {ride.date})
              </p>
            </div>

            {/* Ride preview mini card */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <img
                  src={ride.driver.avatar}
                  alt={ride.driver.name}
                  className="w-9 h-9 rounded-xl object-cover"
                />
                <div>
                  <span className="font-semibold text-slate-800 block">
                    Վարորդ՝ {ride.driver.name}
                  </span>
                  <span className="text-slate-500">
                    {ride.vehicle.model}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-bold text-slate-900 text-sm block">
                  {ride.price * seats} ֏
                </span>
                <span className="text-[11px] text-slate-400">
                  {seats > 1 ? `${seats} տեղի համար` : '1 տեղի համար'}
                </span>
              </div>
            </div>

            {/* Number of seats selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-orange-500" />
                Տեղերի քանակ
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((num) => {
                  const disabled = num > ride.availableSeats;
                  return (
                    <button
                      key={num}
                      type="button"
                      disabled={disabled}
                      onClick={() => setSeats(num)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        seats === num
                          ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                          : disabled
                          ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300'
                      }`}
                    >
                      {num} {num === 1 ? 'տեղ' : 'տեղ'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional note */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                Հաղորդագրություն վարորդին (ոչ պարտադիր)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Օրինակ՝ Կլինեմ Թումոյի կանգառի մոտ 08:55-ին..."
                rows={2}
                className="w-full p-3 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:border-orange-500 outline-none"
              />
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                Չեղարկել
              </button>

              <button
                type="submit"
                className="py-2.5 px-4 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl transition-all shadow-md shadow-orange-600/25 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Այո, ուղարկել հարցումը</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
