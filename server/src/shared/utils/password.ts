import { pbkdf2Sync, randomBytes } from 'crypto';
import { User } from 'src/users/user.entity';
import { v4 as uuidv4 } from 'uuid';

export type JwtPayload = {
  userId: number;
  email: string;
  tokenVersion?: number;
};

export const hashPassword = (password: string, salt: string) => {
  return pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
};

export const createFinalPassword = (password: string) => {
  const salt = randomBytes(32).toString('hex');
  const hash = hashPassword(password, salt);

  return `${salt}.${hash}`;
};

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateUUID = () => {
  return uuidv4();
};

export const isJwtSessionValid = (payload: JwtPayload, user: User) => {
  return (payload.tokenVersion ?? 0) === (user.tokenVersion ?? 0);
};
