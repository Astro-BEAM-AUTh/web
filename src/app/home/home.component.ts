import { Component } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselSlide } from './carousel/carousel.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CarouselComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

  constructor(private router: Router) {}

  // Mock slide data, might be replaced with API call later
  carouselSlides: CarouselSlide[] = [
    {
      id: 1,
      imageUrl: 'img/carousel-1.jpg',
      backgroundColor: '#1a237e',
      title: 'ASTRO',
      subtitle: 'Aristotle Student Telescope for Radio Astronomy Observations',
      buttons: [
        { 
          text: 'Open Positions', 
          routerLink: '/open-positions'
        }
      ]
    },
    {
      id: 2,
      imageUrl: 'img/carousel-2.png',
      backgroundColor: '#b71c1c',
      title: 'Research & Innovation',
      subtitle: 'Pushing the Boundaries of Astrophysics',
      buttons: [
        { 
          text: 'Our News', 
          routerLink: '/news'
        }
      ]
    },
    {
      id: 3,
      imageUrl: 'img/carousel-3.jpg',
      backgroundColor: '#1b5e20',
      title: 'Info & About Us',
      subtitle: 'Learn More About Our Mission and Team',
      buttons: [
        { 
          text: 'Learn More', 
          routerLink: '/about-us'
        },
        {
          text: 'Contact Us', 
          routerLink: '/contact'
        }
      ]
    }
  ];

}
