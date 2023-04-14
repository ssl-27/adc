export type User = {
  id: number;

  userName: string;
  password: string;

  firstName: string;
  lastName: string;

  avatar: string;

  email: string;
  address: string;
  phoneNumber: string;

  creditCardIssuer: string;
  creditCardNumber: string;
  creditCardCVV: string;

  tier: number; // 0: normal, 1: vip, 2: vvip
  points: number;
  birthDate: string;

  registeredAt: string;
};
