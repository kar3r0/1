export interface LinkStyle {
  backgroundColor: string;
  textColor: string;
}

export interface LinkData {
  platform: string;
  url: string;
  icon: string;
  style: LinkStyle;
}

export interface QuoteData {
  text: string;
  style: string;
}

export interface ProfilePictureData {
  url: string;
  shape: string;
  borderColor: string;
}

export interface ProfileData {
  picture: ProfilePictureData;
  name: string;
  subtitle: string;
  location: string;
  quote: QuoteData;
}

export interface FooterData {
  text: string;
  textColor: string;
}

export interface CardStyleData {
  theme: string;
  backgroundColor: string;
  borderRadius: string;
  fontFamily: string;
}

export interface CardData {
  card: CardStyleData;
  profile: ProfileData;
  links: LinkData[];
  footer: FooterData;
}
