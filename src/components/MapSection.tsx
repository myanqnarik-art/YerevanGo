import React, { useState } from 'react';
import { DISTRICT_MAP_COORDS } from '../data/mockData';
import { Ride } from '../types';
import { MapPin, Navigation, Eye, Compass, Layers, Car } from 'lucide-react';

interface MapSectionProps {
  selectedRide?: Ride | null;
  onSelectDistrict?: (district: string) => void;
  activeFrom?: string;
  activeTo?: string;
}

export const MapSection: React.FC<MapSectionProps> = ({
  selectedRide,
  onSelectDistrict,
  activeFrom,
  activeTo,
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  const startCoord = selectedRide?.from.district
    ? DISTRICT_MAP_COORDS[selectedRide.from.district]
    : activeFrom
    ? DISTRICT_MAP_COORDS[activeFrom]
    : null;

  const endCoord = selectedRide?.to.district
    ? DISTRICT_MAP_COORDS[selectedRide.to.district]
    : activeTo
    ? DISTRICT_MAP_COORDS[activeTo]
    : null;

  return (
    <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl border border-slate-800">
      
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-1">
            <Compass className="w-4 h-4" />
            <span>Երևանի ինտերակտիվ քարտեզ</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Ուղևորությունների երթուղիներ
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Ընտրեք շրջանը քարտեզի վրա՝ համապատասխան ուղևորությունները տեսնելու համար
          </p>
        </div>

        {/* Legend / Status indicator */}
        <div className="flex items-center gap-3 text-xs bg-slate-800/80 backdrop-blur-sm px-3.5 py-2 rounded-2xl border border-slate-700/80 shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span className="text-slate-300">Մեկնարկ</span>
          </div>
          <span className="text-slate-600">·</span>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-slate-300">Վերջնակետ</span>
          </div>
        </div>
      </div>

      {/* Interactive SVG Map Container */}
      <div className="relative w-full aspect-16/10 sm:aspect-16/9 bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden p-2">
        
        <svg
          viewBox="100 50 680 540"
          className="w-full h-full select-none"
        >
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#F43F5E" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Grid lines representing urban grid */}
          <g stroke="#1E293B" strokeWidth="0.5" strokeDasharray="3 3">
            {[100, 200, 300, 400, 500, 600, 700].map((x) => (
              <line key={`x-${x}`} x1={x} y1="50" x2={x} y2="590" />
            ))}
            {[100, 200, 300, 400, 500].map((y) => (
              <line key={`y-${y}`} x1="100" y1={y} x2="780" y2={y} />
            ))}
          </g>

          {/* Stylized Hrazdan River / Gorge Curve */}
          <path
            d="M 280 80 Q 250 200 320 280 T 310 440 T 260 520"
            fill="none"
            stroke="#0284C7"
            strokeWidth="3.5"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />

          {/* Major Yerevan Ring road and arterial roads */}
          <path
            d="M 390 310 m -60, 0 a 60,60 0 1,0 120,0 a 60,60 0 1,0 -120,0"
            fill="none"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="4 2"
          />
          {/* Radial arteries from Kentron */}
          <line x1="390" y1="310" x2="210" y2="220" stroke="#334155" strokeWidth="1.5" />
          <line x1="390" y1="310" x2="380" y2="160" stroke="#334155" strokeWidth="1.5" />
          <line x1="390" y1="310" x2="660" y2="240" stroke="#334155" strokeWidth="1.5" />
          <line x1="390" y1="310" x2="200" y2="370" stroke="#334155" strokeWidth="1.5" />
          <line x1="390" y1="310" x2="330" y2="440" stroke="#334155" strokeWidth="1.5" />
          <line x1="390" y1="310" x2="520" y2="440" stroke="#334155" strokeWidth="1.5" />

          {/* Active Route Vector Line (if selected or searched) */}
          {startCoord && endCoord && (
            <g>
              <line
                x1={startCoord.x}
                y1={startCoord.y}
                x2={endCoord.x}
                y2={endCoord.y}
                stroke="url(#routeGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow)"
              />
              <line
                x1={startCoord.x}
                y1={startCoord.y}
                x2={endCoord.x}
                y2={endCoord.y}
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeDasharray="6 6"
                className="animate-pulse"
              />
            </g>
          )}

          {/* District Interactive Nodes */}
          {Object.entries(DISTRICT_MAP_COORDS).map(([district, coord]) => {
            const isStart =
              selectedRide?.from.district === district || activeFrom === district;
            const isEnd =
              selectedRide?.to.district === district || activeTo === district;
            const isHovered = hoveredDistrict === district;

            return (
              <g
                key={district}
                className="cursor-pointer transition-all duration-150"
                onMouseEnter={() => setHoveredDistrict(district)}
                onMouseLeave={() => setHoveredDistrict(null)}
                onClick={() => onSelectDistrict && onSelectDistrict(district)}
              >
                {/* Pulse ring for active start/end */}
                {(isStart || isEnd) && (
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={isStart ? 18 : 16}
                    fill={isStart ? '#F97316' : '#F43F5E'}
                    fillOpacity="0.25"
                    className="animate-ping"
                  />
                )}

                {/* Main Node Circle */}
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={isStart || isEnd ? 12 : isHovered ? 10 : 7}
                  fill={
                    isStart
                      ? '#F97316'
                      : isEnd
                      ? '#F43F5E'
                      : isHovered
                      ? '#FB923C'
                      : '#334155'
                  }
                  stroke="#FFFFFF"
                  strokeWidth={isStart || isEnd ? 2.5 : 1.5}
                  filter={isStart || isEnd ? 'url(#glow)' : undefined}
                />

                {/* Inner dot */}
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={isStart || isEnd ? 4 : 2}
                  fill="#FFFFFF"
                />

                {/* District Label Text */}
                <text
                  x={coord.x}
                  y={coord.y + 22}
                  textAnchor="middle"
                  className={`text-[12px] font-bold tracking-tight select-none pointer-events-none transition-colors ${
                    isStart
                      ? 'fill-orange-400 text-sm'
                      : isEnd
                      ? 'fill-rose-400 text-sm'
                      : isHovered
                      ? 'fill-white'
                      : 'fill-slate-400'
                  }`}
                >
                  {coord.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover details badge overlay */}
        {hoveredDistrict && (
          <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700 text-xs shadow-lg flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-semibold text-white">{hoveredDistrict}</span>
            <span className="text-slate-400">· Սեղմեք՝ որոնելու համար</span>
          </div>
        )}

        {selectedRide && (
          <div className="absolute top-4 right-4 bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl border border-slate-700 text-xs shadow-xl max-w-xs hidden sm:block">
            <span className="text-orange-400 font-semibold block mb-1">
              Ընտրված երթուղի
            </span>
            <div className="font-bold text-white text-sm">
              {selectedRide.from.district} → {selectedRide.to.district}
            </div>
            <div className="text-slate-400 mt-1 flex items-center justify-between">
              <span>{selectedRide.time}</span>
              <span className="font-bold text-white">{selectedRide.price} ֏</span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
