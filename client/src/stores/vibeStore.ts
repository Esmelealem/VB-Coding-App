import { create } from 'zustand';

type Theme = 'dark' | 'light' | 'terminal';
type Sound = 'rain' | 'cafe' | 'waves' | null;

interface User {
  email: string;
  name: string;
  avatar?: string;
}

type VibeState = {
  initializeAuth(): unknown;
  // UI/Editor State
  theme: Theme;
  sound: Sound;
  volume: number;
  code: string;
  
  // Auth State
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setTheme: (theme: Theme) => void;
  setSound: (sound: Sound) => void;
  setVolume: (volume: number) => void;
  setCode: (code: string) => void;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Auth Methods
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useVibeStore = create<VibeState>((set) => ({
  // Initial State
  theme: 'dark',
  sound: null,
  volume: 0.5,
  code: '// Happy coding! \nconsole.log("Hello Vibe")',
  user: null,
  isLoading: false,
  error: null,

  // Setters
  setTheme: (theme) => set({ theme }),
  setSound: (sound) => set({ sound }),
  setVolume: (volume) => set({ volume }),
  setCode: (code) => set({ code }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  // Auth Actions
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      // Mock authentication - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const user = { email, name: 'Developer', avatar: '' };
      set({ user, isLoading: false });
      localStorage.setItem('vibeUser', JSON.stringify(user));
    } catch (err) {
      set({ error: 'Login failed', isLoading: false });
    }
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem('vibeUser');
  },

  // Initialize from storage
  initializeAuth: () => {
    const storedUser = localStorage.getItem('vibeUser');
    if (storedUser) {
      try {
        set({ user: JSON.parse(storedUser) });
      } catch (err) {
        localStorage.removeItem('vibeUser');
      }
    }
  }
}));

// Initialize auth state when store is created
useVibeStore.getState().initializeAuth();