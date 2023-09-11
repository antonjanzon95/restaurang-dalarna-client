import { UserInfo } from 'firebase/auth';

export interface IUserInfo {
  _id: string;
  email: string;
  isAdmin?: boolean;
}
