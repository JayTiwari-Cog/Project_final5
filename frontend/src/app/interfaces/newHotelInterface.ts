export interface NewHotelInterface {
  _id?: string;
  hotelName: string;
  roomType: string[];
  amenities: string[];
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  pricePerNight: number;
  feedbacks?: string[];
}