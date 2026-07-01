export interface ForgotPasswordState<T> {
  success: boolean;
  message: string;
  inputs: T;
  errors?: {
    email?: string[];
  };
}

export interface ResetPasswordState<T> {
  success: boolean;
  message: string;
  inputs: T;
  errors?: {
    token?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
}
