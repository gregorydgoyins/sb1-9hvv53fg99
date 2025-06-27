import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    signIn, 
    signUp, 
    signOut, 
    loadUser, 
    clearError 
  } = useAuthStore();

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    clearError
  };
}

export default useAuth;