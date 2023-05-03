import { Role } from './role';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  isDriver: boolean;
  isRider: boolean;
}
