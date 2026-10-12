import React from 'react';
import { Ride } from '../types';
import { 
  X, 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Car, 
  ShieldCheck, 
  Phone, 
  Check, 
  Wind, 
  Volume2, 
  Luggage,
  Ban,
  MessageSquare,
  Navigation
} from 'lucide-react';

interface RideDetailsModalProps {
  ride: Ride | null;
  onClose: () => void;
  onRequestJoin: (ride: Ride) => void;
}

export const RideDetailsModal: React.FC<RideDetailsModalProps> = ({
  ride,
  onClose,
  onRequestJoin,
}) => {
  if (!ride) return null;

  const isFull = ride.availableSeats <= 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Ուղևորության մանրամասներ
            </h2>
            <p className="text-xs text-slate-500">
              {ride.from.district} → {ride.to.district}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Փակել"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          
          {/* Driver Card */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={ride.driver.avatar}
                  alt={ride.driver.name}
                  className="w-13 h-13 rounded-2xl object-cover ring-2 ring-white shadow-xs"
                />
                {ride.driver.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  {ride.driver.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                  <span className="flex items-center gap-1 font-bold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {ride.driver.rating.toFixed(1)}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span>{ride.driver.tripsCompleted} ուղևորություն</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Անդամ է՝ {ride.driver.memberSince}
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl block text-center mb-1">
                Հաստատված
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {ride.driver.phone}
              </span>
            </div>
          </div>

          {/* Route details with intermediate stops */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Երթուղու մանրամասներ
            </h4>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 relative">
              <div className="space-y-4">
                
                {/* Pickup */}
                <div className="flex items-start gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-orange-500 ring-4 ring-orange-100 mt-1 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block">Մեկնարկի վայր</span>
                    <span className="font-bold text-slate-900 text-base block">
                      {ride.from.district}
                    </span>
                    {ride.from.landmark && (
                      <span className="text-xs text-slate-600 block mt-0.5">
                        {ride.from.landmark} {ride.from.address && `(${ride.from.address})`}
                      </span>
                    )}
                  </div>
                </div>

                {/* Intermediate stops if available */}
                {ride.stops && ride.stops.length > 0 && (
                  <div className="pl-6 border-l-2 border-dashed border-slate-200 ml-1.5 space-y-2 py-1">
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-slate-400" />
                      Հնարավոր միջանկյալ կանգառներ՝
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ride.stops.map((stop, i) => (
                        <span
                          key={i}
                          className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg"
                        >
                          {stop}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dropoff */}
                <div className="flex items-start gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-rose-100 mt-1 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block">Վերջնակետ</span>
                    <span className="font-bold text-slate-900 text-base block">
                      {ride.to.district}
                    </span>
                    {ride.to.landmark && (
                      <span className="text-xs text-slate-600 block mt-0.5">
                        {ride.to.landmark} {ride.to.address && `(${ride.to.address})`}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Key Info Grid: Date, Time, Seats, Price */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-[11px] text-slate-400 block">Ամսաթիվ</span>
              <span className="font-bold text-slate-800 text-sm mt-0.5 block">
                {ride.date}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-[11px] text-slate-400 block">Մեկնում</span>
              <span className="font-bold text-orange-600 text-sm mt-0.5 block">
                {ride.time}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
              <span className="text-[11px] text-slate-400 block">Ազատ տեղեր</span>
              <span className="font-bold text-slate-800 text-sm mt-0.5 block">
                {ride.availableSeats} տեղ
              </span>
            </div>

            <div className="p-3 bg-orange-50/60 rounded-2xl border border-orange-100 text-center">
              <span className="text-[11px] text-orange-600 block font-medium">Արժեք</span>
              <span className="font-extrabold text-slate-900 text-base mt-0.5 block">
                {ride.price} ֏
              </span>
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Մեքենա</span>
                <span className="font-bold text-slate-900 text-sm">
                  {ride.vehicle.model}
                </span>
                <span className="text-xs text-slate-500 ml-1.5">
                  ({ride.vehicle.color})
                </span>
              </div>
            </div>

            <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-800">
              {ride.vehicle.plateNumber}
            </span>
          </div>

          {/* Description */}
          {ride.description && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Նկարագրություն և պայմաններ
              </h4>
              <p className="p-3.5 bg-slate-50 rounded-2xl text-slate-700 text-xs sm:text-sm leading-relaxed border border-slate-100">
                {ride.description}
              </p>
            </div>
          )}

          {/* Features */}
          <div className="flex flex-wrap gap-2 text-xs text-slate-600">
            {ride.features?.airConditioning && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100">
                <Wind className="w-3.5 h-3.5 text-sky-600" />
                Օդորակիչ
              </span>
            )}
            {ride.features?.nonSmoking && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100">
                <Ban className="w-3.5 h-3.5 text-rose-500" />
                Չծխողների սրահ
              </span>
            )}
            {ride.features?.largeTrunk && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100">
                <Luggage className="w-3.5 h-3.5 text-amber-600" />
                Մեծ բեռնախցիկ
              </span>
            )}
            {ride.features?.music && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100">
                <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                Հաճելի երաժշտություն
              </span>
            )}
          </div>

        </div>

        {/* Modal Footer with Action Buttons */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          >
            Փակել
          </button>

          <button
            onClick={() => {
              onRequestJoin(ride);
            }}
            disabled={isFull}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md cursor-pointer ${
              isFull
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white shadow-orange-600/25 hover:shadow-orange-600/35'
            }`}
          >
            {isFull ? 'Տեղեր չկան' : 'Ուղարկել միանալու հարցում'}
          </button>
        </div>

      </div>
    </div>
  );
};
