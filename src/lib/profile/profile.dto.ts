export interface ProfileDto {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  memberSince: string;
  libraryCount: number;
}

export interface Profile {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
  memberSince: Date;
  libraryCount: number;
}
