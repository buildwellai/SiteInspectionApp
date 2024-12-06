export interface UserPreferences {
  personal: {
    name: string;
    jobTitle: string;
    email: string;
    phone: string;
    company: string;
    address: {
      line1: string;
      line2?: string;
      city: string;
      postcode: string;
      country: string;
    };
  };
  storage: {
    localPath: string;
    autoBackup: boolean;
    compressionQuality: number;
    backupFrequency: 'realtime' | 'hourly' | 'daily';
  };
  display: {
    defaultTextSize: string;
    theme: 'light' | 'dark' | 'system';
    accentColor: string;
  };
}