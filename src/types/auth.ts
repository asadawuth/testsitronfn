export type UserRole = "MANAGER" | "TEAMLEADER" | "FLOORSTAFF";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  tel: string;
  role: UserRole;
}

export interface UserSystemItem {
  user_id: number;
  role: string;
  device: string | null;
  is_revoked: boolean;
  expires_at: string | null;
  created_at: string;
}
