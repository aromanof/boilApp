export interface UserInterface {
    userId: number | string;
    name: string;
    email: string;
    login: string;
    roles?: Array<string>;
}

export interface VerifyTokenResponseInterface {
  tokenValid: boolean;
  user: UserInterface;
}

export interface LoginResponseInterface {
  isValid: boolean;
  token?: string;
  user: UserInterface;
}
