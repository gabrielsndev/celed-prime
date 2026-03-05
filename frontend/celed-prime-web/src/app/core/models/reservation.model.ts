import { UserResponse } from "./user.model";

export enum ReservationStatus {
    COMPLETED = 'COMPLETED',
    CONFIRMED = 'CONFIRMED',
    CANCELED = 'CANCELED'
}

export interface ReservationRequest {
    date: string
}

export interface ReservationResponse {
    readonly id: number;
    readonly date: string;
    readonly user: UserResponse;
    readonly status: ReservationStatus;
}