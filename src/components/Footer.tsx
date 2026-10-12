import React from 'react';
import { Logo } from './Logo';
import { MapPin, Phone, Mail, Globe, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo white size="md" />
            <p className="text-slate-300 text-sm font-medium">
              "Միասին՝ նույն ճանապարհով։"
            </p>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              YerevanGo-ն ժամանակակից հարթակ է Երևանում համատեղ երթևեկության և ուղեկիցներ գտնելու համար։ Խնայեք ժամանակ, նվազեցրեք ծախսերն ու քաղաքի խցանումները։
            </p>
            <div className="flex items-center gap-2 pt-2 text-slate-500 text-xs">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              <span>Երևան, Հայաստանի Հանրապետություն</span>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Հարթակ
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Գլխավոր
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rides')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Ուղևորություններ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Ինչպես է աշխատում
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('safety')}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Մեր մասին & Անվտանգություն
                </button>
              </li>
            </ul>
          </div>

          {/* Districts */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Հիմնական ուղղություններ
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>Աջափնյակ → Կենտրոն</li>
              <li>Դավթաշեն → Կենտրոն</li>
              <li>Մալաթիա → Կենտրոն</li>
              <li>Արաբկիր → Շենգավիթ</li>
              <li>Նոր Նորք → Կենտրոն</li>
            </ul>
          </div>

          {/* Legal & Help */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Աջակցություն & Իրավական
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="hover:text-slate-300 transition-colors cursor-pointer">
                  Օգնություն & ՀՏՀ
                </span>
              </li>
              <li>
                <span className="hover:text-slate-300 transition-colors cursor-pointer">
                  Գաղտնիության քաղաքականություն
                </span>
              </li>
              <li>
                <span className="hover:text-slate-300 transition-colors cursor-pointer">
                  Օգտագործման պայմաններ
                </span>
              </li>
              <li>
                <span className="hover:text-slate-300 transition-colors cursor-pointer">
                  Կապ մեզ հետ՝ support@yerevango.am
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} YerevanGo. Բոլոր իրավունքները պաշտպանված են։
          </div>

          <div className="flex items-center gap-1">
            <span>Ստեղծված է սիրով</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>Երևանի համար</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
