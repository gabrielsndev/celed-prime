export interface JwtPayload {
  iss: string;
  sub: string;
  role: string;
  exp: number;
}