import React from 'react';
import { Ride } from '../types';
import { 
  Star, 
  MapPin, 
  Users, 
  Clock, 
  Calendar, 
  Car, 
  ShieldCheck, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface RideCardProps {
  ride: Ride;
  onViewDetails: (ride: Ride) => void;
  onJoin: (ride: Ride) => void;
}

export const RideCard: React.FC<RideCardProps> = ({
  ride,
  onViewDetails,
  onJoin,
}) => {
  const isFull = ride.availableSeats <= 0;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 hover:border-orange-300 transition-all duration-200 hover:shadow-xl hover:shadow-slate-200/50 p-5 sm:p-6 flex flex-col justify-between group">
      
      <div>
        {/* Header: Driver info, Rating, and "Շատ մոտ" badge */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-100">
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={ride.driver.avatar}
                alt={ride.driver.name}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100"
              />
              {ride.driver.verified && (
                <div 
                  className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs" 
                  title="Հաստատված վարորդ"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                </div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-slate-900 text-sm sm:text-base group-hover:text-orange-600 transition-colors">
                  {ride.driver.name}
                </h3>
              </div>
              
              {/* Unboxed metadata: rating & trips */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                <span className="flex items-center gap-1 font-semibold text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {ride.driver.rating.toFixed(1)}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>{ride.driver.tripsCompleted} ուղևորություն</span>
              </div>
            </div>
          </div>

          {/* Close match indicator if applicable */}
          {ride.isCloseMatch && (
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ձեր երթուղուն շատ մոտ</span>
            </div>
          )}
        </div>

        {/* Route visualization */}
        <div className="py-4">
          <div className="relative pl-6 space-y-3">
            {/* Vertical connector line */}
            <div className="absolute left-2.5 top-2.5 bottom-2.5 w-0.5 bg-gradient-to-b from-orange-400 via-amber-300 to-rose-500" />

            {/* Starting Point */}
            <div className="relative">
              <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-orange-500 ring-4 ring-white" />
              <div>
                <span className="text-sm font-bold text-slate-900 block leading-tight">
                  {ride.from.district}
                </span>
                {ride.from.landmark && (
                  <span className="text-xs text-slate-500 line-clamp-1">
                    {ride.from.landmark}
                  </span>
                )}
              </div>
            </div>

            {/* Destination */}
            <div className="relative pt-1">
              <div className="absolute -left-6 top-2 w-3 h-3 rounded-full bg-rose-500 ring-4 ring-white" />
              <div>
                <span className="text-sm font-bold text-slate-900 block leading-tight">
                  {ride.to.district}
                </span>
                {ride.to.landmark && (
                  <span className="text-xs text-slate-500 line-clamp-1">
                    {ride.to.landmark}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Time, Car, Features */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{ride.date}</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-slate-900">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              <span>{ride.time}</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Car className="w-3.5 h-3.5 text-slate-400" />
              <span>{ride.vehicle.model}</span>
              <span className="text-slate-400">({ride.vehicle.color})</span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer: Price, Seats & Action Buttons */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        
        {/* Price & Seats */}
        <div>
          <div className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            {ride.price.toLocaleString()} <span className="text-orange-600 font-bold">֏</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span className={isFull ? 'text-rose-600 font-medium' : ''}>
              {isFull ? 'Տեղեր չկան' : `${ride.availableSeats} ազատ տեղ`}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(ride)}
            className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            Դիտել մանրամասները
          </button>

          <button
            onClick={() => onJoin(ride)}
            disabled={isFull}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs cursor-pointer ${
              isFull
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white shadow-orange-500/20 hover:shadow-orange-500/30'
            }`}
          >
            Միանալ
          </button>
        </div>

      </div>

    </div>
  );
};
