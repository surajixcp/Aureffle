export type AuthMode = 'login' | 'signup' | 'forgot-password';

export type MemberTier = 'Club Aureffle Gold' | 'Club Aureffle Noir' | 'Privilège VIP';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  tier: MemberTier;
  loyaltyPoints: number;
  reservationsCount: number;
  joinedDate: string;
  favoriteItem?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password?: string;
  agreeToTerms: boolean;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  authMode: AuthMode;
  setAuthMode: (mode: AuthMode) => void;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  signup: (credentials: SignupCredentials) => Promise<boolean>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<boolean>;
}
