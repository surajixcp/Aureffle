import { isFirebaseConfigured } from './config';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber?: string | null;
  isVIPMember?: boolean;
  loyaltyPoints?: number;
}

/**
 * Authentication Service Adapter
 * Provides local session storage fallback until live Firebase credentials are wired.
 */
class AuthService {
  private currentUser: UserProfile | null = null;
  private listeners: ((user: UserProfile | null) => void)[] = [];

  constructor() {
    // Restore session if available
    try {
      const saved = localStorage.getItem('aureffle_user_session');
      if (saved) {
        this.currentUser = JSON.parse(saved);
      }
    } catch {
      this.currentUser = null;
    }
  }

  getCurrentUser(): UserProfile | null {
    return this.currentUser;
  }

  subscribe(listener: (user: UserProfile | null) => void): () => void {
    this.listeners.push(listener);
    listener(this.currentUser);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  async signInWithEmail(email: string): Promise<UserProfile> {
    const user: UserProfile = {
      uid: `usr_${Date.now()}`,
      email,
      displayName: email.split('@')[0],
      isVIPMember: true,
      loyaltyPoints: 120,
    };
    this.currentUser = user;
    localStorage.setItem('aureffle_user_session', JSON.stringify(user));
    this.notify();
    return user;
  }

  async signOut(): Promise<void> {
    this.currentUser = null;
    localStorage.removeItem('aureffle_user_session');
    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.currentUser));
  }
}

export const authService = new AuthService();
