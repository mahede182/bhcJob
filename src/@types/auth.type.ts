export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export interface User {
  id: number;
  name: string;
  email?: string;
  phone: string;
  gender?: Gender | string;
  dob?: string;
  image?: string;
  passport_number?: string;
}

export interface SignUpForm {
  name: string;
  phone: string;
  gender: string;
  email: string;
  passport_number: string;
  password: string;
  confirm_password: string;
}

export interface VerifyOtpParams {
  phone: string;
}
