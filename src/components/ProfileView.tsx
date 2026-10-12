import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  Star, 
  ShieldCheck, 
  Car, 
  Phone, 
  Mail, 
  Calendar, 
  Check, 
  Edit3, 
  MessageSquare,
  Award
} from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateProfile,
}) => {
  const [role, setRole] = useState<'driver' | 'passenger' | 'both'>(user.role);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [bio, setBio] = useState(user.bio || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      surname,
      bio,
      role,
    });
    setIsEditing(false);
  };

  const handleRoleChange = (newRole: 'driver' | 'passenger' | 'both') => {
    setRole(newRole);
    onUpdateProfile({ role: newRole });
  };

  return (
    <div className="space-y-6">
      
      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative">
              <img
                src={user.avatar}
                alt={`${user.name} ${user.surname}`}
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-orange-50 shadow-md"
              />
              <div 
                className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-xl shadow-xs" 
                title="Հաստատված հաշիվ"
              >
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {user.name} {user.surname}
                </h2>
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-lg">
                  Հաստատված անդամ
                </span>
              </div>

              {/* Rating and Trips stats */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs sm:text-sm text-slate-600 mt-2">
                <span className="flex items-center gap-1 font-bold text-amber-600">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {user.rating.toFixed(1)}
                </span>
                <span className="text-slate-300">·</span>
                <span className="font-semibold text-slate-800">
                  {user.tripsCount} ուղևորություն
                </span>
                <span className="text-slate-300">·</span>
                <span className="font-semibold text-slate-800">
                  {user.successfulMatches} հաջողված միացում
                </span>
              </div>

              {/* Contact and member since */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 mt-3">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {user.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Անդամ է՝ {user.memberSince}
                </span>
              </div>

              {user.bio && (
                <p className="text-xs text-slate-600 mt-3 max-w-xl italic">
                  "{user.bio}"
                </p>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer shrink-0 self-center md:self-start"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Խմբագրել պրոֆիլը</span>
          </button>

        </div>

        {/* Role Preference Segmented Control */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Իմ դերը YerevanGo-ում
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleRoleChange('both')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                role === 'both'
                  ? 'border-orange-500 bg-orange-50/50 shadow-xs ring-1 ring-orange-500'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="font-bold text-xs text-slate-900">
                Վարորդ & Ուղևոր
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Կարող եմ և՛ հրապարակել երթուղի, և՛ միանալ ուրիշներին
              </div>
            </button>

            <button
              onClick={() => handleRoleChange('driver')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                role === 'driver'
                  ? 'border-orange-500 bg-orange-50/50 shadow-xs ring-1 ring-orange-500'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="font-bold text-xs text-slate-900">
                Ես վարորդ եմ
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Հիմնականում հրապարակում եմ իմ մեքենայի ուղևորությունները
              </div>
            </button>

            <button
              onClick={() => handleRoleChange('passenger')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                role === 'passenger'
                  ? 'border-orange-500 bg-orange-50/50 shadow-xs ring-1 ring-orange-500'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="font-bold text-xs text-slate-900">
                Ես ուղևոր եմ
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Որոնում եմ հարմար երթուղիներ և միանում վարորդներին
              </div>
            </button>
          </div>
        </div>

        {/* Edit Form Drawer */}
        {isEditing && (
          <form onSubmit={handleSave} className="mt-6 pt-6 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase">
              Պրոֆիլի տվյալների խմբագրում
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Անուն</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ազգանուն</label>
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Կարճ նկարագրություն</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={2}
                className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
              >
                Չեղարկել
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold text-white bg-orange-600 rounded-xl"
              >
                Պահպանել
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Vehicle Info Card */}
      {user.vehicle && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Car className="w-4 h-4 text-orange-600" />
              Մեքենայի տվյալներ
            </h3>
            <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-800">
              {user.vehicle.plateNumber}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl">
              <span className="text-[11px] text-slate-400 block">Մոդել</span>
              <span className="font-bold text-slate-900 text-xs sm:text-sm">
                {user.vehicle.model}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl">
              <span className="text-[11px] text-slate-400 block">Գույն</span>
              <span className="font-bold text-slate-900 text-xs sm:text-sm">
                {user.vehicle.color}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl">
              <span className="text-[11px] text-slate-400 block">Տարեթիվ</span>
              <span className="font-bold text-slate-900 text-xs sm:text-sm">
                {user.vehicle.year || '2018'}
              </span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-2xl">
              <span className="text-[11px] text-emerald-700 block">Կարգավիճակ</span>
              <span className="font-bold text-emerald-800 text-xs sm:text-sm">
                Ստուգված
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm mb-4 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-amber-500" />
          Ուղեկիցների կարծիքները ({user.reviews.length})
        </h3>

        <div className="divide-y divide-slate-100 space-y-4">
          {user.reviews.map((rev) => (
            <div key={rev.id} className="pt-4 first:pt-0">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2.5">
                  <img
                    src={rev.authorAvatar}
                    alt={rev.authorName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-semibold text-slate-900 text-xs block">
                      {rev.authorName}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {rev.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{rev.rating}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 pl-10.5 leading-relaxed">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
