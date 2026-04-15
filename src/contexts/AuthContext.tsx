import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, setSharedSession, getSharedSession, clearSharedSession } from '../lib/supabase';
import { ADMIN_EMAILS } from '../config/admin';

interface AccountBlock {
  status: string;
  reason: string;
  suspended_until: string | null;
}

interface AuthResult {
  data?: unknown;
  error?: { message: string } | AuthError | null;
}

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isSupabaseConfigured: boolean;
  accountBlock: AccountBlock | null;
  clearAccountBlock: () => void;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (email: string, password: string) => Promise<AuthResult>;
  loginWithGoogle: () => Promise<AuthResult>;
  logout: () => Promise<{ error: AuthError | null }>;
  resetPassword: (email: string) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [accountBlock, setAccountBlock] = useState<AccountBlock | null>(null);

  const clearAccountBlock = useCallback(() => setAccountBlock(null), []);

  const handlePostAuth = useCallback(async (userId: string) => {
    if (!supabase || !userId) return;

    const currentDomain = window.location.hostname;
    const { data } = await supabase
      .from('user_profiles')
      .select('signup_domain, visited_sites')
      .eq('id', userId)
      .single();

    if (data) {
      const updates: Record<string, unknown> = {};
      if (!data.signup_domain) updates.signup_domain = currentDomain;
      const sites = Array.isArray(data.visited_sites) ? data.visited_sites as string[] : [];
      if (!sites.includes(currentDomain)) {
        updates.visited_sites = [...sites, currentDomain];
      }
      if (Object.keys(updates).length > 0) {
        supabase.from('user_profiles').update(updates).eq('id', userId).then(() => {});
      }
    }

    try {
      const { data: statusData } = await supabase.rpc('check_user_status', {
        target_user_id: userId,
        current_domain: currentDomain,
      });
      if (statusData && statusData.status && statusData.status !== 'active') {
        setAccountBlock({
          status: statusData.status,
          reason: statusData.reason || '',
          suspended_until: statusData.suspended_until || null,
        });
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        return;
      }
    } catch {
      // check_user_status function may not exist
    }
  }, []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(async ({ data: { session: currentSession }, error: sessionError }) => {
      if (sessionError) {
        console.error('Error getting session:', sessionError.message);
        setError(sessionError.message);
      }
      setSession(currentSession);
      const u = currentSession?.user ?? null;
      setUser(u);
      if (u) {
        if (currentSession?.refresh_token) setSharedSession(currentSession.refresh_token);
        handlePostAuth(u.id);
      } else {
        const rt = getSharedSession();
        if (rt) {
          try {
            const { data } = await supabase!.auth.refreshSession({ refresh_token: rt });
            if (!data.session) clearSharedSession();
          } catch { clearSharedSession(); }
        }
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        if (newSession?.refresh_token) setSharedSession(newSession.refresh_token);
        if (event === 'SIGNED_OUT') clearSharedSession();

        setSession(newSession);
        const u = newSession?.user ?? null;
        setUser(u);
        setLoading(false);
        setError(null);
        if (event === 'SIGNED_IN' && u) {
          supabase!.from('user_profiles')
            .update({ last_sign_in_at: new Date().toISOString() })
            .eq('id', u.id)
            .then(() => {});
          handlePostAuth(u.id);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [handlePostAuth]);

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    if (!supabase) {
      const msg = 'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.';
      setError(msg);
      return { error: { message: msg } };
    }

    setError(null);
    setLoading(true);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (loginError) {
      setError(loginError.message);
      return { error: loginError };
    }

    return { data };
  }, []);

  const signup = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    if (!supabase) {
      const msg = 'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.';
      setError(msg);
      return { error: { message: msg } };
    }

    setError(null);
    setLoading(true);

    const { data, error: signupError } = await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (signupError) {
      setError(signupError.message);
      return { error: signupError };
    }

    return { data };
  }, []);

  const loginWithGoogle = useCallback(async (): Promise<AuthResult> => {
    if (!supabase) {
      const msg = 'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.';
      setError(msg);
      return { error: { message: msg } };
    }

    setError(null);

    const { data, error: googleError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin }
    });

    if (googleError) {
      setError(googleError.message);
      return { error: googleError };
    }

    return { data };
  }, []);

  const logout = useCallback(async (): Promise<{ error: AuthError | null }> => {
    if (!supabase) {
      setUser(null);
      setSession(null);
      return { error: null };
    }

    setError(null);

    const { error: logoutError } = await supabase.auth.signOut();

    if (logoutError) {
      setError(logoutError.message);
      return { error: logoutError };
    }

    setUser(null);
    setSession(null);
    return { error: null };
  }, []);

  const resetPassword = useCallback(async (email: string): Promise<AuthResult> => {
    if (!supabase) {
      const msg = 'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.';
      setError(msg);
      return { error: { message: msg } };
    }

    setError(null);

    const { data, error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });

    if (resetError) {
      setError(resetError.message);
      return { error: resetError };
    }

    return { data };
  }, []);

  const allEmails = [
    user?.email,
    (user as any)?.user_metadata?.email,
    (user as any)?.identities?.[0]?.identity_data?.email,
  ].filter(Boolean).map((e: any) => e.toLowerCase());
  const isAdmin = allEmails.some((e: string) => ADMIN_EMAILS.includes(e));

  const value = useMemo((): AuthContextValue => ({
    user,
    session,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin,
    isSupabaseConfigured: !!supabase,
    accountBlock,
    clearAccountBlock,
    login,
    signup,
    loginWithGoogle,
    logout,
    resetPassword
  }), [user, session, loading, error, isAdmin, accountBlock, clearAccountBlock, login, signup, loginWithGoogle, logout, resetPassword]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
