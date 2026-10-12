import React, { useState } from 'react';
import { YEREVAN_DISTRICTS } from '../data/mockData';
import { MapPin, ArrowRightLeft, Calendar, Clock, Search } from 'lucide-react';

interface SearchFormProps {
  onSearch: (params: { from: string; to: string; date: string; time: string }) => void;
  initialFrom?: string;
  initialTo?: string;
  compact?: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  initialFrom = '',
  initialTo = '',
  compact = false,
}) => {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [date, setDate] = useState('Այսօր');
  const [time, setTime] = useState('09:00');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ from, to, date, time });
  };

  const handleSelectQuickRoute = (start: string, end: string) => {
    setFrom(start);
    setTo(end);
    onSearch({ from: start, to: end, date, time });
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className={`bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 ${
          compact ? 'p-4 sm:p-5' : 'p-5 sm:p-7 md:p-8'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
          
          {/* Starting point (Որտեղի՞ց) */}
          <div className="relative md:col-span-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              Որտեղի՞ց
            </label>
            <div className="relative">
              <input
                type="text"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                onFocus={() => setShowFromDropdown(true)}
                onBlur={() => setTimeout(() => setShowFromDropdown(false), 200)}
                placeholder="Օրինակ՝ Աջափնյակ"
                className="w-full pl-3.5 pr-8 py-3 text-sm text-slate-900 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-orange-500 rounded-2xl outline-none transition-all placeholder:text-slate-400 font-medium"
              />
              {from && (
                <button
                  type="button"
                  onClick={() => setFrom('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dropdown list for districts */}
            {showFromDropdown && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 max-h-56 overflow-y-auto py-1 divide-y divide-slate-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400">
                  Երևանի վարչական շրջաններ
                </div>
                {YEREVAN_DISTRICTS.filter((d) =>
                  d.toLowerCase().includes(from.toLowerCase())
                ).map((district) => (
                  <button
                    key={district}
                    type="button"
                    onMouseDown={() => {
                      setFrom(district);
                      setShowFromDropdown(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600 flex items-center gap-2 cursor-pointer"
                  >
                    <MapPin className="w-3 h-3 text-orange-400 shrink-0" />
                    {district}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Swap Button (Mobile hidden in-line, styled nicely) */}
          <div className="flex justify-center md:col-span-1">
            <button
              type="button"
              onClick={handleSwap}
              title="Փոխել ուղղությունը"
              className="p-2 text-slate-500 hover:text-orange-600 bg-slate-100 hover:bg-orange-50 border border-slate-200 rounded-xl transition-all hover:rotate-180 duration-200 cursor-pointer"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Destination (Ո՞ւր) */}
          <div className="relative md:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              Ո՞ւր
            </label>
            <div className="relative">
              <input
                type="text"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                onFocus={() => setShowToDropdown(true)}
                onBlur={() => setTimeout(() => setShowToDropdown(false), 200)}
                placeholder="Օրինակ՝ Կենտրոն"
                className="w-full pl-3.5 pr-8 py-3 text-sm text-slate-900 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-rose-500 rounded-2xl outline-none transition-all placeholder:text-slate-400 font-medium"
              />
              {to && (
                <button
                  type="button"
                  onClick={() => setTo('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dropdown list for destination */}
            {showToDropdown && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-xl z-30 max-h-56 overflow-y-auto py-1 divide-y divide-slate-50">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400">
                  Երևանի վարչական շրջաններ
                </div>
                {YEREVAN_DISTRICTS.filter((d) =>
                  d.toLowerCase().includes(to.toLowerCase())
                ).map((district) => (
                  <button
                    key={district}
                    type="button"
                    onMouseDown={() => {
                      setTo(district);
                      setShowToDropdown(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-rose-50 hover:text-rose-600 flex items-center gap-2 cursor-pointer"
                  >
                    <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                    {district}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-2 md:col-span-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Ամսաթիվ
              </label>
              <select
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-2.5 py-3 text-xs sm:text-sm text-slate-800 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-2xl outline-none font-medium"
              >
                <option value="Այսօր">Այսօր</option>
                <option value="Վաղը">Վաղը</option>
                <option value="13 Հոկտեմբեր">13 Հոկտ</option>
                <option value="14 Հոկտեմբեր">14 Հոկտ</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Ժամ
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-2.5 py-3 text-xs sm:text-sm text-slate-800 bg-slate-50 border border-slate-200 focus:border-orange-500 rounded-2xl outline-none font-medium"
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
          </div>

          {/* Submit Search Button */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-transparent mb-1.5 hidden md:block">
              Գործողություն
            </label>
            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-orange-600/20 hover:shadow-orange-600/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Գտնել ուղևորություն</span>
            </button>
          </div>

        </div>

        {/* Quick popular routes strip */}
        {!compact && (
          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">Հաճախակի որոնվող՝</span>
            {[
              { from: 'Աջափնյակ', to: 'Կենտրոն' },
              { from: 'Դավթաշեն', to: 'Կենտրոն' },
              { from: 'Մալաթիա-Սեբաստիա', to: 'Կենտրոն' },
              { from: 'Ավան', to: 'Կենտրոն' },
              { from: 'Նոր Նորք', to: 'Կենտրոն' },
              { from: 'Արաբկիր', to: 'Շենգավիթ' },
            ].map((route, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSelectQuickRoute(route.from, route.to)}
                className="px-2.5 py-1 text-slate-700 bg-slate-100 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors font-medium cursor-pointer"
              >
                {route.from} → {route.to}
              </button>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};
