export interface DevSettings {
  profilePicture: string;
  name: string;
  phone: string;
  biography: string;
  email: string;
  documentation: {
    cpf: string;
    cnpj: string;
  };
  socialMedia: {
    website: string;
    discord: string;
    twitter: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    github: string;
  };
}
