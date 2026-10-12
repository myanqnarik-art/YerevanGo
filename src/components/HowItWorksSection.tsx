import React from 'react';
import { Search, Users, Car, CheckCircle } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Որոնիր',
      desc: 'Մուտքագրիր՝ որտեղից ուր ես գնում Երևանում, ինչպես նաև նախընտրելի օրն ու ժամը։',
      icon: Search,
      color: 'bg-orange-50 text-orange-600',
    },
    {
      num: '02',
      title: 'Գտիր',
      desc: 'Տես նույն կամ մոտ ուղղությամբ մեկնող մարդկանց, ծանոթացիր նրանց վարկանիշին և մեքենային։',
      icon: Users,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      num: '03',
      title: 'Միացիր',
      desc: 'Ուղարկիր միանալու հարցում, պայմանավորվիր հարմար կանգառի մասին և ճանապարհորդիր շահավետ։',
      icon: Car,
      color: 'bg-rose-50 text-rose-600',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-2">
            Պարզ և հարմար գործընթաց
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ինչպե՞ս է աշխատում YerevanGo-ն
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Ընդամենը 3 պարզ քայլ՝ Երևանում համատեղ, արագ և մատչելի ուղևորությունների համար
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-slate-50/70 hover:bg-slate-50 rounded-3xl p-8 border border-slate-200/80 transition-all hover:shadow-lg hover:shadow-slate-100 group relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${step.color} shadow-xs group-hover:scale-105 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-2xl font-black text-slate-300 font-mono">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-orange-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Արագ & Ապահով</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
