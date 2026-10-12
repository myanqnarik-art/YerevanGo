import React, { useState } from 'react';
import { Ride, JoinRequest, UserProfile } from '../types';
import { ProfileView } from './ProfileView';
import { 
  Car, 
  Users, 
  Clock, 
  Calendar, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Bookmark, 
  User, 
  Phone, 
  ShieldCheck, 
  PlusCircle,
  MessageSquare
} from 'lucide-react';

interface DashboardProps {
  currentUser: UserProfile;
  allRides: Ride[];
  joinRequests: JoinRequest[];
  onAcceptRequest: (requestId: string) => void;
  onRejectRequest: (requestId: string) => void;
  onOpenCreateRide: () => void;
  onViewRideDetails: (ride: Ride) => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  allRides,
  joinRequests,
  onAcceptRequest,
  onRejectRequest,
  onOpenCreateRide,
  onViewRideDetails,
  onUpdateProfile,
}) => {
  const [activeTab, setActiveTab] = useState<
    'my-rides' | 'my-published' | 'requests' | 'saved' | 'profile'
  >('my-published');

  // Filter rides published by this user
  const myPublishedRides = allRides.filter(
    (r) => r.driver.id === currentUser.id
  );

  // My bookings as passenger
  const myBookedRides = allRides.filter(
    (r) => r.id === 'ride_1' // mock passenger booked ride
  );

  const pendingRequestsCount = joinRequests.filter(
    (r) => r.status === 'pending'
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Dashboard Welcome Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-orange-50"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                Բարև, {currentUser.name} {currentUser.surname}
              </h1>
              <span className="px-2.5 py-0.5 bg-orange-100 text-orange-700 text-xs font-semibold rounded-lg">
                {currentUser.role === 'both' ? 'Վարորդ & Ուղևոր' : currentUser.role === 'driver' ? 'Վարորդ' : 'Ուղևոր'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Կառավարեք ձեր ուղևորությունները, հարցումները և պրոֆիլի կարգավորումները
            </p>
          </div>
        </div>

        <button
          onClick={onOpenCreateRide}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg shadow-orange-600/20 transition-all cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Ստեղծել նոր ուղևորություն</span>
        </button>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        <button
          onClick={() => setActiveTab('my-published')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-2xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'my-published'
              ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>Իմ հրապարակումները ({myPublishedRides.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('requests')}
          className={`relative flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-2xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'requests'
              ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Միանալու հարցումներ</span>
          {pendingRequestsCount > 0 && (
            <span className="w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ml-1">
              {pendingRequestsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('my-rides')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-2xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'my-rides'
              ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Իմ ուղևորությունները (Որպես ուղևոր)</span>
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-2xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'saved'
              ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Պահպանվածներ</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-2xl transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Պրոֆիլ</span>
        </button>
      </div>

      {/* Tab 1: My Published Rides */}
      {activeTab === 'my-published' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Ձեր կողմից հրապարակված ուղևորությունները
            </h2>
          </div>

          {myPublishedRides.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
              <Car className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="font-semibold text-slate-800 text-sm">
                Դեռ չունեք հրապարակված ուղևորություններ
              </p>
              <button
                onClick={onOpenCreateRide}
                className="mt-3 px-4 py-2 bg-orange-600 text-white text-xs font-bold rounded-xl"
              >
                Ստեղծել առաջին ուղևորությունը
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {myPublishedRides.map((ride) => (
                <div
                  key={ride.id}
                  className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:border-orange-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl">
                        Ակտիվ
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {ride.date}, {ride.time}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                        <span className="font-bold text-slate-900 text-sm">
                          {ride.from.district}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <span className="font-bold text-slate-900 text-sm">
                          {ride.to.district}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl">
                      <span>Ազատ տեղեր՝ <strong>{ride.availableSeats}</strong></span>
                      <span>Գին՝ <strong>{ride.price} ֏</strong></span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      {ride.vehicle.model}
                    </span>
                    <button
                      onClick={() => onViewRideDetails(ride)}
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700"
                    >
                      Դիտել մանրամասները →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Join Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Միանալու հարցումներ ուղևորներից
            </h2>
          </div>

          {joinRequests.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="font-semibold text-slate-800 text-sm">
                Նոր հարցումներ չկան
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {joinRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Passenger details */}
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <img
                          src={req.passenger.avatar}
                          alt={req.passenger.name}
                          className="w-11 h-11 rounded-2xl object-cover ring-2 ring-slate-100"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {req.passenger.name}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span>⭐ {req.passenger.rating}</span>
                            <span>·</span>
                            <span>{req.seatsRequested} տեղ</span>
                          </div>
                        </div>
                      </div>

                      {/* Status label */}
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-xl ${
                          req.status === 'accepted'
                            ? 'bg-emerald-50 text-emerald-700'
                            : req.status === 'rejected'
                            ? 'bg-rose-50 text-rose-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {req.status === 'accepted'
                          ? 'Հաստատված'
                          : req.status === 'rejected'
                          ? 'Մերժված'
                          : 'Սպասվում է'}
                      </span>
                    </div>

                    {/* Route summary */}
                    <div className="py-3 text-xs space-y-1 text-slate-700">
                      <div className="font-semibold text-slate-900">
                        {req.rideSummary.from} → {req.rideSummary.to}
                      </div>
                      <div className="text-slate-500">
                        {req.rideSummary.date}, {req.rideSummary.time} · {req.rideSummary.price * req.seatsRequested} ֏
                      </div>
                      {req.notes && (
                        <div className="mt-2 p-2.5 bg-slate-50 rounded-xl text-slate-600 text-xs italic">
                          "{req.notes}"
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions: Accept / Reject */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-400">
                      {req.createdAt}
                    </span>

                    {req.status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onRejectRequest(req.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        >
                          Մերժել
                        </button>
                        <button
                          onClick={() => onAcceptRequest(req.id)}
                          className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-xs cursor-pointer"
                        >
                          Ընդունել
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-slate-500">
                        Գործողությունն ավարտված է
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: My Bookings as Passenger */}
      {activeTab === 'my-rides' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Ամրագրված ուղևորություններ
          </h2>

          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg">
                  Հաստատված
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Այսօր, 09:00
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Աջափնյակ → Կենտրոն
              </h4>
              <p className="text-xs text-slate-500">
                Վարորդ՝ Արման Սարգսյան · Toyota Prius · 500 ֏
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="tel:+37498442210"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                <Phone className="w-3.5 h-3.5" />
                Զանգահարել վարորդին
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Saved Rides */}
      {activeTab === 'saved' && (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-semibold text-slate-800 text-sm">
            Պահպանված երթուղիներ չկան
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Սեղմեք էջանշանների կոճակը որոնման արդյունքներում՝ այստեղ պահելու համար
          </p>
        </div>
      )}

      {/* Tab 5: Profile */}
      {activeTab === 'profile' && (
        <ProfileView
          user={currentUser}
          onUpdateProfile={onUpdateProfile}
        />
      )}

    </div>
  );
};
