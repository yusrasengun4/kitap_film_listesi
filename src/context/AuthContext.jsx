import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest('SHA-256', data);

  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

const normalize = (username) => username.trim().toLocaleLowerCase('tr-TR');

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('users', []);
  const [currentUsername, setCurrentUsername] = useLocalStorage(
    'currentUser',
    null
  );

  const user = users.find((u) => u.username === currentUsername) ?? null;

 
  async function register({ name, username, password }) {
    const cleanUsername = normalize(username);

    if (users.some((u) => u.username === cleanUsername)) {
      return 'Bu kullanıcı adı zaten alınmış.';
    }

    
    if (users.length === 0) {
      const oldData = localStorage.getItem('medialist');
      if (oldData) {
        localStorage.setItem(`medialist:${cleanUsername}`, oldData);
      }
    }

    const newUser = {
      name: name.trim(),
      username: cleanUsername,
      passwordHash: await hashPassword(password),
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUsername(cleanUsername);
    return null;
  }

  async function login(username, password) {
    const cleanUsername = normalize(username);
    const found = users.find((u) => u.username === cleanUsername);
    const hash = await hashPassword(password);

    if (!found || found.passwordHash !== hash) {
      return 'Kullanıcı adı veya şifre hatalı.';
    }

    setCurrentUsername(cleanUsername);
    return null;
  }

  function logout() {
    setCurrentUsername(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth, AuthProvider içinde kullanılmalı');
  }

  return context;
}