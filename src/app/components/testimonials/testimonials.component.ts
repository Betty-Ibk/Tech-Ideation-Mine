import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  content: string;
  author: string;
  role: string;
  image: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section testimonials">
      <div class="container">
        <div class="section-header text-center animate-on-scroll">
          <span class="section-tag">Testimonials</span>
          <h2 class="section-title">What Our <span class="text-primary">Customers</span> Say</h2>
          <p class="section-subtitle">Discover how GTCO is transforming banking experiences for people like you</p>
        </div>
        
        <div class="testimonials-carousel animate-on-scroll">
          <div class="testimonials-track" [style.transform]="'translateX(' + (-activeIndex * 100) + '%)'">
            <div *ngFor="let testimonial of testimonials" class="testimonial-item">
              <div class="testimonial-card">
                <div class="quote-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"></path>
                  </svg>
                </div>
                <p class="testimonial-content">{{testimonial.content}}</p>
                <div class="testimonial-author">
                  <div class="author-image">
                    <img [src]="testimonial.image" [alt]="testimonial.author">
                  </div>
                  <div class="author-info">
                    <h4 class="author-name">{{testimonial.author}}</h4>
                    <p class="author-role">{{testimonial.role}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="carousel-controls">
            <button class="control-btn prev" (click)="prevSlide()" [class.disabled]="activeIndex === 0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M15.5 5l-7 7 7 7-1.5 1.5L5.5 12 14 3.5z"></path>
              </svg>
            </button>
            
            <div class="carousel-dots">
              <button *ngFor="let dot of testimonials; let i = index" 
                      [class.active]="i === activeIndex"
                      (click)="goToSlide(i)"
                      class="dot-btn"></button>
            </div>
            
            <button class="control-btn next" (click)="nextSlide()" [class.disabled]="activeIndex === testimonials.length - 1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M8.5 19l7-7-7-7L10 3.5l8.5 8.5-8.5 8.5z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials {
      background-color: var(--neutral-50);
      position: relative;
      overflow: hidden;
    }
    
    .testimonials::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 50%;
      height: 100%;
      background: linear-gradient(to bottom right, rgba(255, 122, 0, 0.05), transparent);
      z-index: 1;
    }
    
    .testimonials::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40%;
      height: 60%;
      background: linear-gradient(to top left, rgba(255, 122, 0, 0.05), transparent);
      z-index: 1;
    }
    
    .testimonials .container {
      position: relative;
      z-index: 2;
    }
    
    .testimonials-carousel {
      margin-top: var(--space-5);
      position: relative;
      overflow: hidden;
    }
    
    .testimonials-track {
      display: flex;
      transition: transform 0.5s ease;
    }
    
    .testimonial-item {
      flex: 0 0 100%;
      padding: 0 var(--space-2);
    }
    
    .testimonial-card {
      background-color: white;
      border-radius: 12px;
      padding: var(--space-4);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      position: relative;
      margin: 0 auto;
      max-width: 700px;
      animation: fadeInScale 0.5s ease-out;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .testimonial-card:hover {
      transform: translateY(-5px) scale(1.01);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    }
    
    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .quote-icon {
      color: var(--primary-400);
      opacity: 0.3;
      position: absolute;
      top: var(--space-3);
      left: var(--space-3);
      transform: scale(1.5);
    }
    
    .testimonial-content {
      font-size: 1.1rem;
      line-height: 1.7;
      color: var(--neutral-700);
      margin-bottom: var(--space-3);
      padding-left: var(--space-3);
      position: relative;
      font-style: italic;
    }
    
    .testimonial-author {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }
    
    .author-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid var(--primary-100);
    }
    
    .author-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .author-name {
      font-weight: 600;
      margin-bottom: 0;
      color: var(--neutral-800);
    }
    
    .author-role {
      font-size: 0.9rem;
      color: var(--neutral-600);
      margin-bottom: 0;
    }
    
    .carousel-controls {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: var(--space-3);
      gap: var(--space-2);
    }
    
    .control-btn {
      background-color: transparent;
      border: 1px solid var(--neutral-300);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      color: var(--neutral-600);
    }
    
    .control-btn:hover:not(.disabled) {
      background-color: var(--primary-500);
      color: white;
      border-color: var(--primary-500);
    }
    
    .control-btn.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .carousel-dots {
      display: flex;
      gap: 8px;
    }
    
    .dot-btn {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--neutral-300);
      border: none;
      padding: 0;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .dot-btn.active {
      background-color: var(--primary-500);
      transform: scale(1.2);
    }
    
    @media (max-width: 768px) {
      .testimonial-card {
        padding: var(--space-3);
      }
      
      .testimonial-content {
        font-size: 1rem;
      }
    }
  `]
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [
    {
      content: "GTCO's mobile banking app has completely changed how I manage my finances. The interface is intuitive, and I love how it gives me personalized insights about my spending habits. Their smart branches are also impressive - I was in and out in minutes!",
      author: "Sarah Johnson",
      role: "Small Business Owner",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      content: "I was hesitant about banking with a new institution, but GTCO's community-focused approach won me over. Their staff took the time to understand my financial goals and helped me create a plan that works for my family. The educational resources they provide are also excellent.",
      author: "Michael Rodriguez",
      role: "Teacher",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      content: "As someone who travels frequently, having access to GTCO's international banking services has been a game-changer. Their foreign exchange rates are competitive, and the ability to manage everything through their app means I never have to worry about my finances while abroad.",
      author: "Priya Patel",
      role: "Marketing Executive",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      content: "GTCO helped my startup secure the funding we needed to grow. Their business advisors understood our unique challenges and tailored solutions that worked for us. The digital banking tools have streamlined our financial operations, saving us countless hours each month.",
      author: "David Chen",
      role: "Tech Entrepreneur",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
  ];
  
  activeIndex = 0;
  
  ngOnInit() {
    // Auto-advance the carousel
    setInterval(() => {
      if (this.activeIndex < this.testimonials.length - 1) {
        this.activeIndex++;
      } else {
        this.activeIndex = 0;
      }
    }, 5000);
  }
  
  prevSlide() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }
  
  nextSlide() {
    if (this.activeIndex < this.testimonials.length - 1) {
      this.activeIndex++;
    }
  }
  
  goToSlide(index: number) {
    this.activeIndex = index;
  }
}
