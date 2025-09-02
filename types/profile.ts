export interface UserProfile {
  id: string;
  username: string;
  email: string;
  phone: string;
  profileImage?: string;
}

export interface SettingsItem {
  id: string;
  title: string;
  icon: string;
  route: string;
}

