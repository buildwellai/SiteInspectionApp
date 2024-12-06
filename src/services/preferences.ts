import localforage from 'localforage';
import type { UserPreferences } from '../types/preferences';

const PREFERENCES_KEY = 'user_preferences';

const defaultPreferences: UserPreferences = {
  personal: {
    name: '',
    jobTitle: '',
    email: '',
    phone: '',
    company: '',
    address: {
      line1: '',
      city: '',
      postcode: '',
      country: ''
    }
  },
  storage: {
    localPath: '/photos',
    autoBackup: true,
    compressionQuality: 0.8,
    backupFrequency: 'realtime'
  },
  display: {
    defaultTextSize: 'xl',
    theme: 'system',
    accentColor: '#FF8A3D'
  }
};

export const preferencesService = {
  init: async () => {
    await localforage.config({
      name: 'BuildwellAI',
      storeName: 'preferences'
    });

    const existing = await localforage.getItem<UserPreferences>(PREFERENCES_KEY);
    if (!existing) {
      await localforage.setItem(PREFERENCES_KEY, defaultPreferences);
    }
  },

  getPreferences: async (): Promise<UserPreferences> => {
    const prefs = await localforage.getItem<UserPreferences>(PREFERENCES_KEY);
    return prefs || defaultPreferences;
  },

  updatePreferences: async (updates: Partial<UserPreferences>): Promise<UserPreferences> => {
    const current = await preferencesService.getPreferences();
    const updated = {
      ...current,
      ...updates,
      personal: {
        ...current.personal,
        ...updates.personal,
        address: {
          ...current.personal.address,
          ...updates.personal?.address
        }
      },
      storage: {
        ...current.storage,
        ...updates.storage,
        autoBackup: true // Always enforce automatic backup
      },
      display: {
        ...current.display,
        ...updates.display
      }
    };
    await localforage.setItem(PREFERENCES_KEY, updated);
    return updated;
  },

  applyTheme: (theme: 'light' | 'dark' | 'system', accentColor: string) => {
    const root = document.documentElement;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = theme === 'system' ? systemPrefersDark : theme === 'dark';

    if (isDark) {
      root.classList.add('dark');
      root.style.setProperty('--primary', accentColor);
      root.style.setProperty('--background', '#111827');
      root.style.setProperty('--surface', '#1F2937');
      root.style.setProperty('--text-primary', '#F9FAFB');
      root.style.setProperty('--text-secondary', '#D1D5DB');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--primary', accentColor);
      root.style.setProperty('--background', '#F8FAFC');
      root.style.setProperty('--surface', '#FFFFFF');
      root.style.setProperty('--text-primary', '#1A1A1A');
      root.style.setProperty('--text-secondary', '#666666');
    }
  }
};