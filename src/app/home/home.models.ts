// Interface for sponsor cards
export interface Sponsor {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  redirectUrl?: string;
}