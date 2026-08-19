export interface LoginPops {
  isLogin: boolean;
  setIsLogin: (state: boolean) => void;
}

export type LoginState = {
  success: boolean;
  error?: string;
  user?: UserPayload;
};

export type UserRole = "USER" | "ADMIN";

export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  surname?: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface ApiErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

export interface ApiSuccessResponse {
  message: string;
  data: {
    token: string;
  };
}

export interface AuthContextType {
  user: UserPayload | null;
  setUser: (user: UserPayload | null) => void;
  /** Atualiza campos de exibição (nome, sobrenome) da sessão em andamento. */
  updateUser: (changes: Partial<UserPayload>) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
