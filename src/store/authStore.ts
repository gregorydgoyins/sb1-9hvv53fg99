import { create } from 'zustand';
import { AuthUser } from '../services/authService';
import authService from '../services/authService';

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  
  // Actions
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username?: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  
  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { user, error } = await authService.signIn({ email, password });
      
      if (error) {
        throw error;
      }
      
      set({ 
        user, 
        isAuthenticated: !!user,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error as Error, 
        isLoading: false,
        isAuthenticated: false
      });
    }
  },
  
  signUp: async (email, password, username, name) => {
    set({ isLoading: true, error: null });
    try {
      const { user, error } = await authService.signUp({ 
        email, 
        password,
        username,
        name
      });
      
      if (error) {
        throw error;
      }
      
      set({ 
        user, 
        isAuthenticated: !!user,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error as Error, 
        isLoading: false,
        isAuthenticated: false
      });
    }
  },
  
  signOut: async () => {
    set({ isLoading: true });
    try {
      const { error } = await authService.signOut();
      
      if (error) {
        throw error;
      }
      
      set({ 
        user: null, 
        isAuthenticated: false,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error as Error, 
        isLoading: false 
      });
    }
  },
  
  loadUser: async () => {
    set({ isLoading: true });
    try {
      const { user, error } = await authService.getCurrentUser();
      
      if (error) {
        throw error;
      }
      
      set({ 
        user, 
        isAuthenticated: !!user,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        user: null,
        isAuthenticated: false,
        error: error as Error, 
        isLoading: false 
      });
    }
  },
  
  clearError: () => set({ error: null })
}));