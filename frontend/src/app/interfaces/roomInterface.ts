export interface RoomInterface {
  type: string;
  price: number;
  location: string;
  hotelChain: string;
  amenities: { [key: string]: boolean };
}