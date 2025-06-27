import { createClient, SupabaseClient, User, Session, AuthError } from '@supabase/supabase-js';

// Define types for authentication
export interface AuthUser extends User {
  profile?: {
    username?: string;
    avatar_url?: string;
  };
}

export interface SignUpCredentials {
  email: string;
  password: string;
  username?: string;
  name?: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: AuthUser | null;
  session: Session | null;
  error: AuthError | null;
}

export interface ProfileUpdateData {
  username?: string;
  name?: string;
  avatar_url?: string;
}

class AuthService {
  private static instance: AuthService;
  private supabase: SupabaseClient;

  private constructor() {
    // Initialize Supabase client
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase credentials are missing. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.');
    }

    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Get the Supabase client instance
  public getSupabaseClient(): SupabaseClient {
    return this.supabase;
  }

  // Sign up a new user
  public async signUp(credentials: SignUpCredentials): Promise<AuthResponse> {
    try {
      const { email, password } = credentials;
      
      // Register the user with Supabase Auth
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: credentials.username,
            name: credentials.name
          }
        }
      });

      if (error) {
        throw error;
      }

      return {
        user: data.user as AuthUser,
        session: data.session,
        error: null
      };
    } catch (error) {
      console.error('Sign up error:', error);
      return {
        user: null,
        session: null,
        error: error as AuthError
      };
    }
  }

  // Sign in an existing user
  public async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    try {
      const { email, password } = credentials;
      
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      return {
        user: data.user as AuthUser,
        session: data.session,
        error: null
      };
    } catch (error) {
      console.error('Sign in error:', error);
      return {
        user: null,
        session: null,
        error: error as AuthError
      };
    }
  }

  // Sign out the current user
  public async signOut(): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await this.supabase.auth.signOut();
      return { error };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: error as AuthError };
    }
  }

  // Get the current session
  public async getSession(): Promise<{ session: Session | null; error: AuthError | null }> {
    try {
      const { data, error } = await this.supabase.auth.getSession();
      return { session: data.session, error };
    } catch (error) {
      console.error('Get session error:', error);
      return { session: null, error: error as AuthError };
    }
  }

  // Get the current user
  public async getCurrentUser(): Promise<{ user: AuthUser | null; error: AuthError | null }> {
    try {
      const { data, error } = await this.supabase.auth.getUser();
      return { user: data.user as AuthUser, error };
    } catch (error) {
      console.error('Get user error:', error);
      return { user: null, error: error as AuthError };
    }
  }

  // Update user profile
  public async updateProfile(userId: string, profile: ProfileUpdateData): Promise<{ error: Error | null }> {
    try {
      const { error } = await this.supabase
        .from('profiles')
        .upsert({
          id: userId,
          ...profile,
          updated_at: new Date().toISOString()
        });

      return { error };
    } catch (error) {
      console.error('Update profile error:', error);
      return { error: error as Error };
    }
  }

  // Reset password
  public async resetPassword(email: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await this.supabase.auth.resetPasswordForEmail(email);
      return { error };
    } catch (error) {
      console.error('Reset password error:', error);
      return { error: error as AuthError };
    }
  }

  // Update password
  public async updatePassword(password: string): Promise<{ error: AuthError | null }> {
    try {
      const { error } = await this.supabase.auth.updateUser({
        password
      });
      return { error };
    } catch (error) {
      console.error('Update password error:', error);
      return { error: error as AuthError };
    }
  }
}

export const authService = AuthService.getInstance();
export default authService;