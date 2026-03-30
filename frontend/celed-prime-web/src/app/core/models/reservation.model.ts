import { UserResponse } from "./user.model";


export interface ReservationRequest {
    date: string
}

export interface ReservationDTO {
  id: number;
  date: string; 
  status: 'CONFIRMED' | 'PENDING' | 'CANCELED';
  user: any; 
}

export interface ReservationResponse {
  content: ReservationDTO[];
  totalElements: number;
  totalPages: number;
  last: boolean;
}