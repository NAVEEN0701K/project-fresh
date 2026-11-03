import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load static user from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('freshbasket_static_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.warn('Storage read error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Static Sign Up: registers user locally in localStorage
  const signUp = async (email, password, fullName) => {
    try {
      const usersRaw = localStorage.getItem('freshbasket_registered_users');
      const registeredUsers = usersRaw ? JSON.parse(usersRaw) : [];

      // Check if user already exists
      const existing = registeredUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        return { data: null, error: { message: 'An account with this email already exists' } };
      }

      const newUser = {
        id: 'user_' + Date.now(),
        email,
        fullName: fullName || email.split('@')[0],
        password, // saved locally for mock/static authentication
      };

      registeredUsers.push(newUser);
      localStorage.setItem('freshbasket_registered_users', JSON.stringify(registeredUsers));

      // Auto sign in new user
      const authUser = { id: newUser.id, email: newUser.email, fullName: newUser.fullName };
      setUser(authUser);
      localStorage.setItem('freshbasket_static_user', JSON.stringify(authUser));

      return { data: authUser, error: null };
    } catch (err) {
      return { data: null, error: { message: err.message } };
    }
  };

  // Static Sign In: checks against registered users or permits direct static demo credentials
  const signIn = async (email, password) => {
    try {
      const usersRaw = localStorage.getItem('freshbasket_registered_users');
      const registeredUsers = usersRaw ? JSON.parse(usersRaw) : [];

      const found = registeredUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (found) {
        if (found.password !== password) {
          return { data: null, error: { message: 'Incorrect password' } };
        }
        const authUser = { id: found.id, email: found.email, fullName: found.fullName };
        setUser(authUser);
        localStorage.setItem('freshbasket_static_user', JSON.stringify(authUser));
        return { data: authUser, error: null };
      }

      // Default fallback demo login: allows any valid email/password combination instantly
      const demoUser = {
        id: 'user_' + Date.now(),
        email,
        fullName: email.split('@')[0],
      };
      setUser(demoUser);
      localStorage.setItem('freshbasket_static_user', JSON.stringify(demoUser));
      return { data: demoUser, error: null };
    } catch (err) {
      return { data: null, error: { message: err.message } };
    }
  };

  // Static Sign Out
  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('freshbasket_static_user');
    return { error: null };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
