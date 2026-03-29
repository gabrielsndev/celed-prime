export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    readonly token: string;
}

export interface MyJwtPayload {
  iss: string;
  sub: string;
  role: string;
  exp: number;
}