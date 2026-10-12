import React from 'react';
import { ShieldCheck, Star, History, Clock, MessageSquare, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const SafetySection: React.FC = () => {
  const safetyFeatures = [
    {
      title: 'Հաստատված պրոֆիլներ',
      desc: 'Օգտատերերի հեռախոսահամարներն ու անձնական տվյալները ստուգվում են գրանցվելիս։',
      icon: ShieldCheck,
    },
    {
      title: 'Օգտատերերի վարկանիշներ',
      desc: 'Յուրաքանչյուր երթևեկությունից հետո ուղևորներն ու վարորդները գնահատում են միմյանց։',
      icon: Star,
    },
    {
      title: 'Ուղևորությունների պատմություն',
      desc: 'Թափանցիկ վիճակագրություն՝ քանի հաջող երթևեկություն է իրականացրել վարորդը։',
      icon: History,
    },
    {
      title: 'Հստակ երթուղի և ժամ',
      desc: 'Նախապես որոշված մեկնարկային կետեր, միջանկյալ կանգառներ և հստակ գրաֆիկ։',
      icon: Clock,
    },
    {
      title: 'Հաղորդակցություն օգտատերերի միջև',
      desc: 'Ուղիղ կապ և ճշգրտումներ անմիջապես վարորդի հետ նախքան մեկնելը։',
      icon: MessageSquare,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-xl inline-block">
              Վստահելիություն & Անվտանգություն
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Ճանապարհորդիր վստահ
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              YerevanGo-ն ստեղծված է երևանցիների համայնքի համար։ Մենք կարևորում ենք յուրաքանչյուր ուղևորության անվտանգությունն ու փոխադարձ հարգանքը։
            </p>

            {/* Warning Callout Box */}
            <div className="p-4 bg-amber-50/90 border border-amber-200/80 rounded-2xl flex items-start gap-3 mt-6">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-900 text-xs block mb-0.5">
                  Անվտանգության կարևոր հիշեցում
                </span>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Մի կիսվեք անձնական կամ ֆինանսական զգայուն տվյալներով անծանոթ մարդկանց հետ։ Բոլոր պայմանավորվածությունները կատարեք հարթակի միջոցով։
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Safety Features Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {safetyFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat.title}</span>
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
