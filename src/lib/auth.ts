import { toast } from 'sonner';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

const generateMockToken = (email: string): string => {
  return `mock_jwt_token_${email}_${Date.now()}`;
};

const MOCK_USER: User = {
  id: 'user-1',
  email: 'user@example.com',
  name: 'John Doe',
  avatar: 'https://i.pravatar.cc/150?img=68',
};

const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

export const login = async (
  credentials: LoginCredentials,
): Promise<{ success: boolean; message?: string }> => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (
      credentials.email !== 'user@example.com' ||
      credentials.password !== 'password'
    ) {
      return { success: false, message: 'Invalid email or password' };
    }

    const token = generateMockToken(credentials.email);
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(MOCK_USER));

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'An error occurred during login. Please try again.',
    };
  }
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(USER_DATA_KEY);
  toast.success('Logged out successfully');
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(AUTH_TOKEN_KEY);
};
export const getCurrentUser = (): User | null => {
  return MOCK_USER;
};
