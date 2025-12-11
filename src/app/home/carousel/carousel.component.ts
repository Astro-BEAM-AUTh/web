import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselSlideComponent } from './carousel-slide/carousel-slide.component';
import { CarouselSlide } from './carousel.models';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, CarouselSlideComponent, MatButtonModule, RouterModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})

export class CarouselComponent implements OnInit, OnDestroy {
  // Accept slide data as input
  @Input() slides: CarouselSlide[] = [];
  @Input() autoPlayInterval: number = 5000; // Customizable interval
  @Input() enableAutoPlay: boolean = true;

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
    if (this.enableAutoPlay && this.slides.length > 0) {
      this.startCarousel();
    }
  }

  ngOnDestroy(): void {
    // Clean up when component is destroyed (important!)
    this.stopCarousel();
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayInterval);
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
