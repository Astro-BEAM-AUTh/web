import { Component } from '@angular/core';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselSlide } from './carousel/carousel.models';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sponsor } from './home.models';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    CarouselComponent,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

  window = window;

  // Sponsor data, might be replaced with API call later
  sponsors: Sponsor[] = [
    {
      id: 1,
      title: 'simtec',
      description: 'Λογισμικό Προσομοίωσης - Ο αξιόπιστος συνεργάτης σας στην Ελλάδα & Κύπρο',
      imageUrl: 'img/simtec-logo.png',
      redirectUrl: 'https://www.simtec.gr/'
    },
    {
      id: 2,
      title: 'Ansys',
      description: 'Our Mission: Empower Innovators to Drive Human Advancement',
      imageUrl: 'img/ansys-logo.png',
      redirectUrl: 'https://www.ansys.com/'
    }
  ];

  // Slide data, might be replaced with API call later
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

  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  onSubmitContactForm() {
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    // TODO: Replace with actual API call to backend.astrobeam.gr
    // Simulating API call with setTimeout
    setTimeout(() => {
      this.isSubmitting = false;
      
      // Simulate successful submission
      this.submitSuccess = true;
      
      // Reset form
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };

      // Hide success message after 5 seconds
      setTimeout(() => {
        this.submitSuccess = false;
      }, 5000);
    }, 1000);

    // In real implementation, use HttpClient:
    // this.http.post('https://backend.astrobeam.gr/api/contact', this.formData)
    //   .subscribe({
    //     next: () => {
    //       this.isSubmitting = false;
    //       this.submitSuccess = true;
    //       this.formData = { name: '', email: '', subject: '', message: '' };
    //     },
    //     error: () => {
    //       this.isSubmitting = false;
    //       this.submitError = true;
    //     }
    //   });
  }

}
