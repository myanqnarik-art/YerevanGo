import React, { useState, useMemo } from 'react';
import { 
  Ride, 
  UserProfile, 
  JoinRequest, 
  AppNotification, 
  SearchFilters 
} from './types';
import { 
  INITIAL_RIDES, 
  INITIAL_CURRENT_USER, 
  INITIAL_JOIN_REQUESTS, 
  INITIAL_NOTIFICATIONS,
  DISTRICT_ADJACENCY,
  YEREVAN_DISTRICTS
} from './data/mockData';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchForm } from './components/SearchForm';
import { RideCard } from './components/RideCard';
import { RideDetailsModal } from './components/RideDetailsModal';
import { JoinRequestModal } from './components/JoinRequestModal';
import { CreateRideModal } from './components/CreateRideModal';
import { FilterPanel } from './components/FilterPanel';
import { MapSection } from './components/MapSection';
import { Dashboard } from './components/Dashboard';
import { ProfileView } from './components/ProfileView';
import { AuthModal } from './components/AuthModal';
import { HowItWorksSection } from './components/HowItWorksSection';
import { SafetySection } from './components/SafetySection';
import { BottomMobileNav } from './components/BottomMobileNav';
import { Toast, ToastMessage } from './components/Toast';

import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Car, 
  Users, 
  CheckCircle2, 
  Compass, 
  Loader2, 
  Plus, 
  ChevronRight,
  TrendingUp,
  MapPin
} from 'lucide-react';

export default function App() {
  // Core state
  const [rides, setRides] = useState<Ride[]>(INITIAL_RIDES);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(INITIAL_CURRENT_USER);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>(INITIAL_JOIN_REQUESTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  
  // Navigation & View
  const [currentView, setCurrentView] = useState<string>('home');

  // Search parameters
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: 'Այսօր',
    time: '09:00',
  });

  const [filters, setFilters] = useState<SearchFilters>({
    sortBy: 'closest',
    timePeriod: 'all',
    maxPrice: 1000,
    minSeats: 1,
    minRating: 0,
  });

  // UI state
  const [isSearching, setIsSearching] = useState(false);
  const [selectedRideForDetails, setSelectedRideForDetails] = useState<Ride | null>(null);
  const [selectedRideForJoin, setSelectedRideForJoin] = useState<Ride | null>(null);
  const [createRideModalOpen, setCreateRideModalOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'register' }>({
    open: false,
    mode: 'login',
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success', title?: string) => {
    const id = `toast_${Date.now()}`;
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Search Handler
  const handleSearch = (params: { from: string; to: string; date: string; time: string }) => {
    setSearchParams(params);
    setIsSearching(true);
    setCurrentView('rides');

    setTimeout(() => {
      setIsSearching(false);
      showToast(
        `Որոնվել է՝ ${params.from || 'Բոլոր շրջանները'} → ${params.to || 'Բոլոր շրջանները'}`,
        'info',
        'Որոնման արդյունքներ'
      );
    }, 450);
  };

  // Smart Matching Logic
  const matchingRides = useMemo(() => {
    const fromQuery = searchParams.from.trim().toLowerCase();
    const toQuery = searchParams.to.trim().toLowerCase();

    return rides
      .map((ride) => {
        let matchScore = 0;
        let isCloseMatch = false;

        const rideFrom = ride.from.district.toLowerCase();
        const rideTo = ride.to.district.toLowerCase();

        const adjacentFrom = (DISTRICT_ADJACENCY[ride.from.district] || []).map((d) => d.toLowerCase());
        const adjacentTo = (DISTRICT_ADJACENCY[ride.to.district] || []).map((d) => d.toLowerCase());

        // 1. Exact match
        if (fromQuery && toQuery && rideFrom === fromQuery && rideTo === toQuery) {
          matchScore = 100;
          isCloseMatch = true;
        } 
        // 2. Exact start, adjacent destination
        else if (fromQuery && toQuery && rideFrom === fromQuery && adjacentTo.includes(toQuery)) {
          matchScore = 80;
          isCloseMatch = true;
        } 
        // 3. Adjacent start, exact destination
        else if (fromQuery && toQuery && adjacentFrom.includes(fromQuery) && rideTo === toQuery) {
          matchScore = 75;
          isCloseMatch = true;
        } 
        // 4. Exact start only
        else if (fromQuery && rideFrom === fromQuery) {
          matchScore = 60;
        } 
        // 5. Exact destination only
        else if (toQuery && rideTo === toQuery) {
          matchScore = 50;
        } 
        // 6. Adjacent start only
        else if (fromQuery && adjacentFrom.includes(fromQuery)) {
          matchScore = 40;
        } 
        // 7. Fallback baseline
        else {
          matchScore = fromQuery || toQuery ? 10 : 50;
        }

        return {
          ...ride,
          matchScore,
          isCloseMatch: isCloseMatch || Boolean(fromQuery && toQuery && (rideFrom === fromQuery || rideTo === toQuery)),
        };
      })
      .filter((ride) => {
        // Filter by price
        if (filters.maxPrice && ride.price > filters.maxPrice) return false;
        // Filter by available seats
        if (filters.minSeats && ride.availableSeats < filters.minSeats) return false;
        // Filter by rating
        if (filters.minRating && ride.driver.rating < filters.minRating) return false;
        
        // Filter by time period
        if (filters.timePeriod && filters.timePeriod !== 'all') {
          const hour = parseInt(ride.time.split(':')[0], 10);
          if (filters.timePeriod === 'morning' && hour >= 12) return false;
          if (filters.timePeriod === 'day' && (hour < 12 || hour >= 17)) return false;
          if (filters.timePeriod === 'evening' && hour < 17) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'closest') {
          return b.matchScore - a.matchScore;
        }
        if (filters.sortBy === 'cheapest') {
          return a.price - b.price;
        }
        if (filters.sortBy === 'highest_rated') {
          return b.driver.rating - a.driver.rating;
        }
        if (filters.sortBy === 'earliest') {
          return a.time.localeCompare(b.time);
        }
        return b.matchScore - a.matchScore;
      });
  }, [rides, searchParams, filters]);

  // Request Join Handlers
  const handleConfirmJoin = (ride: Ride, seats: number, notes: string) => {
    if (!currentUser) {
      setAuthModal({ open: true, mode: 'login' });
      return;
    }

    const newRequest: JoinRequest = {
      id: `req_${Date.now()}`,
      rideId: ride.id,
      rideSummary: {
        from: ride.from.district,
        to: ride.to.district,
        time: ride.time,
        date: ride.date,
        price: ride.price,
      },
      passenger: {
        id: currentUser.id,
        name: `${currentUser.name} ${currentUser.surname}`,
        avatar: currentUser.avatar,
        phone: currentUser.phone,
        rating: currentUser.rating,
      },
      seatsRequested: seats,
      notes,
      status: 'pending',
      createdAt: 'Հենց նոր',
    };

    setJoinRequests((prev) => [newRequest, ...prev]);

    // Send driver a notification
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      title: 'Նոր միանալու հարցում ունեք։',
      message: `${currentUser.name}-ը ցանկանում է միանալ ձեր ուղևորությանը (${ride.from.district} → ${ride.to.district}, ${seats} տեղ)։`,
      time: 'Հենց նոր',
      read: false,
      type: 'new_request',
      rideId: ride.id,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast('Միանալու հարցումն ուղարկված է վարորդին։', 'success');
  };

  // Driver Accept / Reject Handlers
  const handleAcceptRequest = (requestId: string) => {
    setJoinRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          // Deduct seats
          setRides((currentRides) =>
            currentRides.map((r) =>
              r.id === req.rideId
                ? { ...r, availableSeats: Math.max(0, r.availableSeats - req.seatsRequested) }
                : r
            )
          );
          return { ...req, status: 'accepted' };
        }
        return req;
      })
    );

    // Add notification
    const notif: AppNotification = {
      id: `notif_${Date.now()}`,
      title: 'Հարցումն ընդունված է',
      message: 'Արմանն ընդունեց ձեր միանալու հարցումը։',
      time: 'Հենց նոր',
      read: false,
      type: 'request_accepted',
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast('Ուղևորի հարցումը հաստատված է։ Տեղերը թարմացված են։', 'success');
  };

  const handleRejectRequest = (requestId: string) => {
    setJoinRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: 'rejected' } : req))
    );
    showToast('Հարցումը մերժված է։', 'info');
  };

  // Create Ride Handler
  const handleCreateRide = (newRide: Ride) => {
    setRides((prev) => [newRide, ...prev]);
    showToast('Ձեր ուղևորությունը հաջողությամբ հրապարակվեց։', 'success');
    setCurrentView('rides');
  };

  // Profile update handler
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updated });
      showToast('Պրոֆիլի տվյալները պահպանվեցին։', 'success');
    }
  };

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-orange-500/20 selection:text-orange-950">
      
      {/* Toast System */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Main Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        notifications={notifications}
        onOpenCreateRide={() => {
          if (!currentUser) {
            setAuthModal({ open: true, mode: 'login' });
          } else {
            setCreateRideModalOpen(true);
          }
        }}
        onOpenAuth={(mode) => setAuthModal({ open: true, mode })}
        onLogout={() => {
          setCurrentUser(null);
          showToast('Դուք դուրս եկաք համակարգից', 'info');
        }}
        onMarkNotificationsRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
        }}
      />

      {/* Main Body Content by View */}
      <main className="flex-1">
        
        {/* VIEW: HOME */}
        {currentView === 'home' && (
          <div>
            {/* HERO SECTION */}
            <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 border-b border-slate-200/60 bg-gradient-to-b from-orange-50/50 via-white to-slate-50">
              
              {/* Background ambient decorative shapes */}
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* Title & Subtitle */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-100/80 text-orange-700 text-xs font-semibold rounded-xl mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                    <span>Երևանի համատեղ երթևեկության նորարար հարթակ</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                    Գտիր մեկին, ով գնում է քո ճանապարհով
                  </h1>

                  <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                    Միացիր Երևանում նույն ուղղությամբ մեկնող մարդկանց և ճանապարհորդիր ավելի հարմար ու մատչելի։
                  </p>
                </div>

                {/* Hero 2-Column Split: Search Card + Yerevan Skyline Visual */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
                  
                  {/* Left Column: Search Form Card */}
                  <div className="lg:col-span-7 flex flex-col justify-center">
                    <SearchForm
                      onSearch={handleSearch}
                      initialFrom={searchParams.from}
                      initialTo={searchParams.to}
                    />

                    {/* Secondary CTA buttons */}
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => {
                          if (!currentUser) setAuthModal({ open: true, mode: 'login' });
                          else setCreateRideModalOpen(true);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
                      >
                        <Car className="w-4 h-4 text-orange-400" />
                        <span>Ստեղծել ուղևորություն</span>
                      </button>

                      <button
                        onClick={() => {
                          setCurrentView('rides');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        <Search className="w-4 h-4 text-slate-500" />
                        <span>Դիտել բոլոր երթերը ({rides.length})</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Yerevan Scenic Skyline Image */}
                  <div className="lg:col-span-5 relative flex flex-col">
                    <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-2xl h-full min-h-[300px]">
                      <img
                        src="/src/assets/images/yerevan_skyline_hero_1791747110375.jpg"
                        alt="Երևան, Կասկադ և Արարատ"
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Gradient Scrim for Legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                      {/* Floating Badge */}
                      <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 text-xs">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="font-bold text-slate-900">
                              Ակտիվ ուղևորություններ հիմա
                            </span>
                          </div>
                          <span className="font-extrabold text-orange-600 font-mono text-sm">
                            450 - 600 ֏
                          </span>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-1">
                          Աջափնյակ, Դավթաշեն, Արաբկիր, Մալաթիա, Կենտրոն
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Key Metrics Strip (Below Hero Split) */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-base sm:text-lg font-black text-slate-900 block leading-tight">
                        12
                      </span>
                      <span className="text-xs text-slate-500">Վարչական շրջան</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-base sm:text-lg font-black text-slate-900 block leading-tight">
                        15,000+
                      </span>
                      <span className="text-xs text-slate-500">Կատարված երթ</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-base sm:text-lg font-black text-slate-900 block leading-tight">
                        ~500 ֏
                      </span>
                      <span className="text-xs text-slate-500">Միջին ուղեվարձ</span>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-base sm:text-lg font-black text-slate-900 block leading-tight">
                        4.9 / 5
                      </span>
                      <span className="text-xs text-slate-500">Վստահելիություն</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* POPULAR RIDES FEATURED PREVIEW */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block mb-1">
                    Արագ միացում
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Այսօրվա հայտնի ուղևորությունները
                  </h2>
                </div>

                <button
                  onClick={() => {
                    setCurrentView('rides');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors"
                >
                  <span>Տեսնել բոլոր արդյունքները</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Ride Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rides.slice(0, 6).map((ride) => (
                  <RideCard
                    key={ride.id}
                    ride={ride}
                    onViewDetails={(r) => setSelectedRideForDetails(r)}
                    onJoin={(r) => setSelectedRideForJoin(r)}
                  />
                ))}
              </div>
            </section>

            {/* INTERACTIVE YEREVAN MAP SECTION */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <MapSection
                selectedRide={selectedRideForDetails}
                activeFrom={searchParams.from}
                activeTo={searchParams.to}
                onSelectDistrict={(district) => {
                  setSearchParams({ ...searchParams, from: district });
                  handleSearch({ ...searchParams, from: district });
                }}
              />
            </section>

            {/* HOW IT WORKS */}
            <HowItWorksSection />

            {/* SAFETY & TRUST SECTION */}
            <SafetySection />

          </div>
        )}

        {/* VIEW: RIDES SEARCH & LISTING */}
        {currentView === 'rides' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Top Compact Search Bar */}
            <div className="mb-6">
              <SearchForm
                onSearch={handleSearch}
                initialFrom={searchParams.from}
                initialTo={searchParams.to}
                compact
              />
            </div>

            {/* Filters Toolbar */}
            <FilterPanel
              filters={filters}
              onChangeFilters={(f) => setFilters(f)}
              onReset={() => {
                setFilters({
                  sortBy: 'closest',
                  timePeriod: 'all',
                  maxPrice: 1000,
                  minSeats: 1,
                  minRating: 0,
                });
                setSearchParams({ from: '', to: '', date: 'Այսօր', time: '09:00' });
              }}
              totalResults={matchingRides.length}
            />

            {/* Loading State Animation */}
            {isSearching ? (
              <div className="py-24 text-center space-y-4">
                <Loader2 className="w-10 h-10 text-orange-600 animate-spin mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">
                  Փնտրում ենք համապատասխան ուղևորություններ...
                </h3>
                <p className="text-xs text-slate-500">
                  Համեմատում ենք մոտակա երթուղիներն ու ազատ տեղերը
                </p>
              </div>
            ) : matchingRides.length === 0 ? (
              /* Empty State */
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-xs max-w-lg mx-auto space-y-4 my-8">
                <div className="w-16 h-16 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  Այս պահին համապատասխան ուղևորություն չգտնվեց։
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Փորձիր փոխել որոնման տվյալները կամ ստեղծիր քո ուղևորությունը։
                </p>
                <button
                  onClick={() => {
                    if (!currentUser) setAuthModal({ open: true, mode: 'login' });
                    else setCreateRideModalOpen(true);
                  }}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-orange-600/25 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ստեղծել ուղևորություն</span>
                </button>
              </div>
            ) : (
              /* Results Grid */
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchingRides.map((ride) => (
                    <RideCard
                      key={ride.id}
                      ride={ride}
                      onViewDetails={(r) => setSelectedRideForDetails(r)}
                      onJoin={(r) => setSelectedRideForJoin(r)}
                    />
                  ))}
                </div>

                {/* Map preview below results */}
                <div className="mt-12">
                  <MapSection
                    selectedRide={selectedRideForDetails}
                    activeFrom={searchParams.from}
                    activeTo={searchParams.to}
                    onSelectDistrict={(district) => {
                      setSearchParams({ ...searchParams, from: district });
                      handleSearch({ ...searchParams, from: district });
                    }}
                  />
                </div>
              </div>
            )}

          </div>
        )}

        {/* VIEW: HOW IT WORKS */}
        {currentView === 'how-it-works' && (
          <div>
            <HowItWorksSection />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold">
                  Պատրա՞ստ ես խնայել ժամանակ և գումար
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto">
                  Միացիր YerevanGo-ի երևանյան համայնքին այսօր։
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setCurrentView('rides');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md cursor-pointer"
                  >
                    Գտնել ուղևորություն
                  </button>
                  <button
                    onClick={() => {
                      if (!currentUser) setAuthModal({ open: true, mode: 'login' });
                      else setCreateRideModalOpen(true);
                    }}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 cursor-pointer"
                  >
                    Ստեղծել ուղևորություն
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: SAFETY & ABOUT */}
        {currentView === 'safety' && (
          <div>
            <SafetySection />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                  Մեր առաքելությունը
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  YerevanGo-ն նախատեսված է հատուկ Երևան քաղաքի բնակիչների համար։ Մեր նպատակն է նվազեցնել քաղաքի ծանրաբեռնվածությունը, օգնել վարորդներին կիսել վառելիքի ծախսերը և ուղևորներին առաջարկել հարմարավետ, մատչելի այլընտրանք հասարակական տրանսպորտին և թանկ տաքսիներին։
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      100% Տեղական կենտրոնացում
                    </h4>
                    <p className="text-xs text-slate-500">
                      Երևանի բոլոր 12 վարչական շրջաններն ու հիմնական պողոտաները։
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      Հայկական Դրամով հաշվարկ
                    </h4>
                    <p className="text-xs text-slate-500">
                      Թափանցիկ գներ առանց թաքնված հավելավճարների (֏)։
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      Էկոլոգիապես գրագետ
                    </h4>
                    <p className="text-xs text-slate-500">
                      Քիչ մեքենաներ խցանումներում, ավելի մաքուր օդ Երևանում։
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: DASHBOARD */}
        {currentView === 'dashboard' && currentUser && (
          <Dashboard
            currentUser={currentUser}
            allRides={rides}
            joinRequests={joinRequests}
            onAcceptRequest={handleAcceptRequest}
            onRejectRequest={handleRejectRequest}
            onOpenCreateRide={() => setCreateRideModalOpen(true)}
            onViewRideDetails={(ride) => setSelectedRideForDetails(ride)}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {/* VIEW: PROFILE */}
        {currentView === 'profile' && currentUser && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
              Օգտատիրոջ պրոֆիլ
            </h1>
            <ProfileView
              user={currentUser}
              onUpdateProfile={handleUpdateProfile}
            />
          </div>
        )}

      </main>

      {/* FOOTER */}
      <Footer onNavigate={(view) => {
        setCurrentView(view);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

      {/* MOBILE STICKY BOTTOM NAVIGATION */}
      <BottomMobileNav
        currentView={currentView}
        onNavigate={(view) => {
          if ((view === 'dashboard' || view === 'profile') && !currentUser) {
            setAuthModal({ open: true, mode: 'login' });
            return;
          }
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        unreadCount={unreadNotifCount}
      />

      {/* MODALS */}
      {/* 1. Ride Details Modal */}
      <RideDetailsModal
        ride={selectedRideForDetails}
        onClose={() => setSelectedRideForDetails(null)}
        onRequestJoin={(ride) => {
          setSelectedRideForDetails(null);
          setSelectedRideForJoin(ride);
        }}
      />

      {/* 2. Join Request Confirmation Modal */}
      <JoinRequestModal
        ride={selectedRideForJoin}
        onClose={() => setSelectedRideForJoin(null)}
        onConfirm={handleConfirmJoin}
      />

      {/* 3. Create Ride Modal */}
      {currentUser && (
        <CreateRideModal
          isOpen={createRideModalOpen}
          onClose={() => setCreateRideModalOpen(false)}
          currentUser={currentUser}
          onCreateRide={handleCreateRide}
        />
      )}

      {/* 4. Login / Register Modal */}
      <AuthModal
        isOpen={authModal.open}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ ...authModal, open: false })}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`Բարի գալուստ, ${user.name}։`, 'success');
        }}
      />

    </div>
  );
}
