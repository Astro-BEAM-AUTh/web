import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Interface to define the structure of a slide
interface CarouselSlide {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  backgroundColor: string;
}

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})

export class CarouselComponent {

  // Mock data - will be replaced with API call later
  slides: CarouselSlide[] = [
    {
      id: 1,
      title: 'Welcome to AstroBeam',
      subtitle: 'Exploring the Universe Together',
      imageUrl: 'img/carousel-1.jpg',
      backgroundColor: '#1a237e'
    },
    {
      id: 2,
      title: 'Research & Innovation',
      subtitle: 'Pushing the Boundaries of Astrophysics',
      imageUrl: 'img/carousel-2.png',
      backgroundColor: '#b71c1c'
    },
    {
      id: 3,
      title: 'Join Our Team',
      subtitle: 'Be Part of Something Extraordinary',
      imageUrl: 'img/carousel-3.jpg',
      backgroundColor: '#1b5e20'
    }
  ];

  currentSlide = 0;
  intervalId: any;
  
  // Drag/swipe support
  private touchStartX = 0;
  private touchEndX = 0;
  private minSwipeDistance = 50; // Minimum distance for a swipe
  isDragging = false; // Track if user is currently dragging
  dragOffset = 0; // Current drag offset in pixels

  ngOnInit(): void {
    // Start auto-play when component loads
    this.startCarousel();
  }

  ngOnDestroy(): void {
    // Clean up when component is destroyed (important!)
    this.stopCarousel();
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.restartCarousel();
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.restartCarousel();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    // Restart auto-play timer when user manually changes slide
    this.restartCarousel();
  }

  stopCarousel(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clean up the interval when the component is destroyed
    }
  }

  restartCarousel(): void {
    this.stopCarousel();
    this.startCarousel();
  }

  // Touch event handlers (mobile)
  onTouchStart(event: TouchEvent): void {
    this.isDragging = true;
    this.touchStartX = event.changedTouches[0].clientX;
    this.stopCarousel(); // Pause auto-play while dragging
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    const currentX = event.changedTouches[0].clientX;
    this.dragOffset = currentX - this.touchStartX;
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleDragEnd();
  }

  // Mouse event handlers (desktop)
  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.touchStartX = event.clientX;
    this.stopCarousel(); // Pause auto-play while dragging
    event.preventDefault(); // Prevent text selection
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    const currentX = event.clientX;
    this.dragOffset = currentX - this.touchStartX;
  }

  onMouseUp(event: MouseEvent): void {
    if (!this.isDragging) return;
    this.touchEndX = event.clientX;
    this.handleDragEnd();
  }

  onMouseLeave(): void {
    // Handle case where mouse leaves carousel while dragging
    if (this.isDragging) {
      this.handleDragEnd();
    }
  }

  private handleDragEnd(): void {
    const distance = this.touchStartX - this.touchEndX;
    
    // Determine if swipe was significant enough to change slides
    if (distance > this.minSwipeDistance) {
      this.nextSlide();
    } else if (distance < -this.minSwipeDistance) {
      this.previousSlide();
    } else {
      // Snap back to current slide if drag wasn't far enough
      this.restartCarousel();
    }
    
    // Reset drag state
    this.isDragging = false;
    this.dragOffset = 0;
  }

  // Get the current transform value for the carousel
  getCarouselTransform(): string {
    const baseOffset = this.currentSlide * -100;
    if (this.isDragging) {
      // Convert pixel offset to percentage (assuming wrapper width)
      const percentOffset = (this.dragOffset / window.innerWidth) * 100;
      return `translateX(${baseOffset + percentOffset}%)`;
    }
    return `translateX(${baseOffset}%)`;
  }

}
