import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel-slide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-slide.component.html',
  styleUrl: './carousel-slide.component.scss'
})
export class CarouselSlideComponent {
  @Input() imageUrl!: string;
  @Input() backgroundColor?: string;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() overlayOpacity: number = 0.5; // Customizable overlay darkness
}
