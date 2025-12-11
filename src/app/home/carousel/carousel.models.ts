// Interface for slide data with optional button configuration
export interface CarouselSlide {
  id: number;
  imageUrl: string;
  backgroundColor?: string;
  title?: string;
  subtitle?: string;
  overlayOpacity?: number;
  buttons?: SlideButton[];
}

export interface SlideButton {
  text: string;
  action?: () => void;
  routerLink?: string;
}
