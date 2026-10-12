import React from 'react';
import { SearchFilters } from '../types';
import { SlidersHorizontal, ArrowUpDown, RotateCcw, Clock, Coins, Users, Star } from 'lucide-react';

interface FilterPanelProps {
  filters: SearchFilters;
  onChangeFilters: (filters: SearchFilters) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onChangeFilters,
  onReset,
  totalResults,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Results Count & Filter Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Ֆիլտրեր և Դասակարգում
            </h4>
            <p className="text-xs text-slate-500">
              Գտնվել է <span className="font-bold text-slate-800">{totalResults}</span> ուղևորություն
            </p>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          
          {/* Sorting */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-medium">Դասակարգել՝</span>
            <select
              value={filters.sortBy || 'closest'}
              onChange={(e) =>
                onChangeFilters({
                  ...filters,
                  sortBy: e.target.value as any,
                })
              }
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer"
            >
              <option value="closest">Ամենամոտը</option>
              <option value="cheapest">Ամենաէժանը</option>
              <option value="highest_rated">Ամենաբարձր վարկանիշը</option>
              <option value="earliest">Ամենավաղ ժամը</option>
            </select>
          </div>

          {/* Time period filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-medium">Ժամ՝</span>
            <select
              value={filters.timePeriod || 'all'}
              onChange={(e) =>
                onChangeFilters({
                  ...filters,
                  timePeriod: e.target.value as any,
                })
              }
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer"
            >
              <option value="all">Բոլորը</option>
              <option value="morning">Առավոտյան (&lt; 12:00)</option>
              <option value="day">Ցերեկային (12:00-17:00)</option>
              <option value="evening">Երեկոյան (&gt; 17:00)</option>
            </select>
          </div>

          {/* Max Price filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <Coins className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-slate-500 font-medium">Գին՝</span>
            <select
              value={filters.maxPrice || 1000}
              onChange={(e) =>
                onChangeFilters({
                  ...filters,
                  maxPrice: Number(e.target.value),
                })
              }
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer"
            >
              <option value={1000}>Բոլոր գները</option>
              <option value={400}>Մինչև 400 ֏</option>
              <option value={500}>Մինչև 500 ֏</option>
              <option value={600}>Մինչև 600 ֏</option>
            </select>
          </div>

          {/* Min Seats */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-medium">Ազատ տեղեր՝</span>
            <select
              value={filters.minSeats || 1}
              onChange={(e) =>
                onChangeFilters({
                  ...filters,
                  minSeats: Number(e.target.value),
                })
              }
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer"
            >
              <option value={1}>1+ տեղ</option>
              <option value={2}>2+ տեղ</option>
              <option value={3}>3+ տեղ</option>
            </select>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="text-slate-500 font-medium">Վարկանիշ՝</span>
            <select
              value={filters.minRating || 0}
              onChange={(e) =>
                onChangeFilters({
                  ...filters,
                  minRating: Number(e.target.value),
                })
              }
              className="bg-transparent font-bold text-slate-800 outline-none cursor-pointer"
            >
              <option value={0}>Բոլորը</option>
              <option value={4.8}>4.8+ ⭐</option>
              <option value={4.9}>4.9+ ⭐</option>
            </select>
          </div>

          {/* Reset Filters button */}
          <button
            onClick={onReset}
            title="Մաքրել ֆիլտրերը"
            className="flex items-center gap-1 px-3 py-2 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Մաքրել</span>
          </button>

        </div>

      </div>
    </div>
  );
};
