export type YerevanDistrict =
  | 'Կենտրոն'
  | 'Աջափնյակ'
  | 'Արաբկիր'
  | 'Դավթաշեն'
  | 'Ավան'
  | 'Նոր Նորք'
  | 'Նորք-Մարաշ'
  | 'Մալաթիա-Սեբաստիա'
  | 'Շենգավիթ'
  | 'Էրեբունի'
  | 'Քանաքեռ-Զեյթուն'
  | 'Նուբարաշեն';

export interface LocationPoint {
  district: YerevanDistrict | string;
  landmark?: string;
  address?: string;
}

export interface DriverInfo {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  tripsCompleted: number;
  phone: string;
  verified: boolean;
  memberSince: string;
}

export interface VehicleInfo {
  model: string;
  color: string;
  plateNumber: string;
  year?: number;
}

export interface Ride {
  id: string;
  driver: DriverInfo;
  from: LocationPoint;
  to: LocationPoint;
  date: string; // ISO date string or formatted date
  time: string; // e.g. "09:00"
  price: number; // in Armenian Dram (֏)
  availableSeats: number;
  totalSeats: number;
  vehicle: VehicleInfo;
  description: string;
  stops?: string[];
  features?: {
    airConditioning?: boolean;
    nonSmoking?: boolean;
    petsAllowed?: boolean;
    largeTrunk?: boolean;
    music?: boolean;
  };
  createdAt: string;
  isCloseMatch?: boolean; // Label "Ձեր երթուղուն շատ մոտ"
}

export interface JoinRequest {
  id: string;
  rideId: string;
  rideSummary: {
    from: string;
    to: string;
    time: string;
    date: string;
    price: number;
  };
  passenger: {
    id: string;
    name: string;
    avatar: string;
    phone: string;
    rating: number;
  };
  seatsRequested: number;
  notes?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface UserReview {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  date: string;
  role: 'passenger' | 'driver';
}

export interface UserProfile {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'driver' | 'passenger' | 'both';
  rating: number;
  tripsCount: number;
  successfulMatches: number;
  memberSince: string;
  vehicle?: VehicleInfo;
  bio?: string;
  reviews: UserReview[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'request_accepted' | 'new_request' | 'trip_reminder' | 'request_rejected';
  rideId?: string;
}

export interface SearchFilters {
  fromDistrict?: string;
  toDistrict?: string;
  date?: string;
  timePeriod?: 'all' | 'morning' | 'day' | 'evening';
  maxPrice?: number;
  minSeats?: number;
  minRating?: number;
  sortBy?: 'closest' | 'cheapest' | 'highest_rated' | 'earliest';
}
