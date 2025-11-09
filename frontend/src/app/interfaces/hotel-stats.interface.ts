export interface HotelStats {
  min: number;
  max: number;
  average: number;
}

export interface HotelSummaryStats {
  totalHotels: number;
  priceStats: HotelStats;
  ratingStats: HotelStats;
  locationCount: number;
  uniqueLocations: string[];
}

export interface LocationStats {
  name: string;
  emoji: string;
  hotelCount: number;
  averagePrice: number;
  averageRating: number;
}
