import React, { useState } from 'react';
import { YEREVAN_DISTRICTS } from '../data/mockData';
import { Ride, UserProfile } from '../types';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Coins, 
  Car, 
  Info, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface CreateRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onCreateRide: (ride: Ride) => void;
}

export const CreateRideModal: React.FC<CreateRideModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onCreateRide,
}) => {
  if (!isOpen) return null;

  const [fromDistrict, setFromDistrict] = useState('Աջափնյակ');
  const [fromLandmark, setFromLandmark] = useState('');
  const [toDistrict, setToDistrict] = useState('Կենտրոն');
  const [toLandmark, setToLandmark] = useState('');
  const [date, setDate] = useState('Այսօր');
  const [time, setTime] = useState('09:00');
  const [availableSeats, setAvailableSeats] = useState(3);
  const [price, setPrice] = useState('500');
  const [carModel, setCarModel] = useState(currentUser.vehicle?.model || 'Toyota Prius');
  const [carColor, setCarColor] = useState(currentUser.vehicle?.color || 'Սպիտակ');
  const [description, setDescription] = useState('Կանգառներ հնարավոր են ճանապարհի ընթացքում՝ նախապես պայմանավորվելու դեպքում։');
  const [stopsText, setStopsText] = useState('Բաղրամյան մետրո, Օպերա');

  const [hasAC, setHasAC] = useState(true);
  const [isNonSmoking, setIsNonSmoking] = useState(true);
  const [hasTrunk, setHasTrunk] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!fromDistrict || !toDistrict || !date || !time || !price || !carModel) {
      setError('Լրացրեք բոլոր պարտադիր դաշտերը։');
      return;
    }

    if (fromDistrict === toDistrict && !fromLandmark && !toLandmark) {
      setError('Մեկնարկի և նպատակակետի վայրերը չեն կարող համընկնել առանց հասցեի։');
      return;
    }

    const priceNum = parseInt(price, 10);
    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Մուտքագրեք ճիշտ գին (֏)։');
      return;
    }

    const stops = stopsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newRide: Ride = {
      id: `ride_${Date.now()}`,
      driver: {
        id: currentUser.id,
        name: `${currentUser.name} ${currentUser.surname}`,
        avatar: currentUser.avatar,
        rating: currentUser.rating,
        reviewsCount: currentUser.reviews.length,
        tripsCompleted: currentUser.tripsCount,
        phone: currentUser.phone,
        verified: true,
        memberSince: currentUser.memberSince,
      },
      from: {
        district: fromDistrict,
        landmark: fromLandmark || `${fromDistrict} (կենտրոնական հատված)`,
      },
      to: {
        district: toDistrict,
        landmark: toLandmark || `${toDistrict} (կենտրոնական հատված)`,
      },
      date,
      time,
      price: priceNum,
      availableSeats,
      totalSeats: availableSeats + 1,
      vehicle: {
        model: carModel,
        color: carColor,
        plateNumber: currentUser.vehicle?.plateNumber || '01 AA 101',
      },
      description,
      stops,
      features: {
        airConditioning: hasAC,
        nonSmoking: isNonSmoking,
        largeTrunk: hasTrunk,
        music: true,
      },
      createdAt: new Date().toISOString(),
    };

    setSuccess(true);
    setTimeout(() => {
      onCreateRide(newRide);
      setSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Ստեղծիր քո ուղևորությունը
            </h2>
            <p className="text-xs text-slate-500">
              Հրապարակիր երթուղիդ Երևանում և գտիր ուղեկիցներ
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {success ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Ձեր ուղևորությունը հաջողությամբ հրապարակվեց։
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Այն արդեն տեսանելի է որոնման արդյունքներում։ Ուղևորների հարցումները կտեսնեք ձեր կաբինետում։
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 text-sm">
            
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Route row: Որտեղի՞ց & Ո՞ւր */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  Որտեղի՞ց (Վարչական շրջան) *
                </label>
                <select
                  value={fromDistrict}
                  onChange={(e) => setFromDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-orange-500 font-medium"
                >
                  {YEREVAN_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={fromLandmark}
                  onChange={(e) => setFromLandmark(e.target.value)}
                  placeholder="Հստակ կանգառ (օր.՝ Թումոյի մոտ)"
                  className="w-full mt-2 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  Ո՞ւր (Վարչական շրջան) *
                </label>
                <select
                  value={toDistrict}
                  onChange={(e) => setToDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-rose-500 font-medium"
                >
                  {YEREVAN_DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={toLandmark}
                  onChange={(e) => setToLandmark(e.target.value)}
                  placeholder="Հստակ վայր (օր.՝ Հանրապետության Հրապարակ)"
                  className="w-full mt-2 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Ամսաթիվ *
                </label>
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="Այսօր">Այսօր</option>
                  <option value="Վաղը">Վաղը</option>
                  <option value="13 Հոկտեմբեր">13 Հոկտ</option>
                  <option value="14 Հոկտեմբեր">14 Հոկտ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  Ժամ *
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="08:00">08:00</option>
                  <option value="08:30">08:30</option>
                  <option value="08:45">08:45</option>
                  <option value="09:00">09:00</option>
                  <option value="09:15">09:15</option>
                  <option value="09:30">09:30</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  Ազատ տեղեր *
                </label>
                <select
                  value={availableSeats}
                  onChange={(e) => setAvailableSeats(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value={1}>1 տեղ</option>
                  <option value={2}>2 տեղ</option>
                  <option value={3}>3 տեղ</option>
                  <option value={4}>4 տեղ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-orange-500" />
                  Գին (֏) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="500"
                    step="50"
                    min="100"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-bold pr-7"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-orange-600">
                    ֏
                  </span>
                </div>
              </div>
            </div>

            {/* Car info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-slate-400" />
                  Մեքենայի մոդել *
                </label>
                <input
                  type="text"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  placeholder="Օր.՝ Toyota Prius"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Մեքենայի գույն
                </label>
                <input
                  type="text"
                  value={carColor}
                  onChange={(e) => setCarColor(e.target.value)}
                  placeholder="Օր.՝ Սպիտակ, Սև, Արծաթագույն"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            {/* Intermediate stops */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Միջանկյալ կանգառներ (առանձնացրեք ստորակետով)
              </label>
              <input
                type="text"
                value={stopsText}
                onChange={(e) => setStopsText(e.target.value)}
                placeholder="Օրինակ՝ Կիևյան կամուրջ, Բաղրամյան մետրո"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-slate-400" />
                Լրացուցիչ տեղեկություն
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Կանգառներ հնարավոր են ճանապարհի ընթացքում՝ նախապես պայմանավորվելու դեպքում..."
                rows={2}
                className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>

            {/* Amenities Checkboxes */}
            <div className="flex flex-wrap gap-4 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={hasAC}
                  onChange={(e) => setHasAC(e.target.checked)}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                Օդորակիչ
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={isNonSmoking}
                  onChange={(e) => setIsNonSmoking(e.target.checked)}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                Չծխողների սրահ
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={hasTrunk}
                  onChange={(e) => setHasTrunk(e.target.checked)}
                  className="rounded text-orange-600 focus:ring-orange-500"
                />
                Մեծ բեռնախցիկ
              </label>
            </div>

            {/* Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Չեղարկել
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-md shadow-orange-600/25 transition-all cursor-pointer"
              >
                Հրապարակել ուղևորությունը
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
