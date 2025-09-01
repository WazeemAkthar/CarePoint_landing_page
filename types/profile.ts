export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
}

export interface SettingsItem {
  id: string;
  title: string;
  icon: string;
  route: string;
}
interface UpdateProfileResponse {
  id: string;
  username: string;
  email: string;
  phone: string;
}
