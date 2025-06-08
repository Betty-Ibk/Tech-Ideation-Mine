import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="services" class="section services">
      <div class="container">
        <div class="services-intro animate-on-scroll">
          <div class="services-text">
            <span class="section-tag">Our Services</span>
            <h2 class="section-title">Financial Solutions <span class="text-primary">for Everyone</span></h2>
            <p class="services-description">
              At GTCO, we believe in providing accessible financial services that empower individuals and businesses to achieve their goals. Our innovative approach to banking means you get the best of both worlds: cutting-edge technology with the personal touch you deserve.
            </p>
            <a href="#contact" class="btn btn-primary mt-3">Get Started Today</a>
          </div>
          <div class="services-image">
            <img src="https://images.pexels.com/photos/7681926/pexels-photo-7681926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="GTCO Banking Services">
          </div>
        </div>
        
        <div class="services-grid">
          <div *ngFor="let service of services" class="service-card animate-on-scroll">
            <div class="service-icon" [innerHTML]="service.icon"></div>
            <h3 class="service-title">{{service.title}}</h3>
            <p class="service-description">{{service.description}}</p>
            <a href="#" class="service-link">Learn more <span class="arrow">→</span></a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services {
      background-color: white;
    }
    
    .services-intro {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-5);
      margin-bottom: var(--space-6);
      align-items: center;
    }
    
    .services-text {
      padding-right: var(--space-4);
    }
    
    .services-description {
      color: var(--neutral-600);
      margin-bottom: var(--space-3);
      line-height: 1.7;
    }
    
    .services-image {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .services-image img {
      width: 100%;
      height: auto;
      display: block;
      transition: transform 0.5s ease;
    }
    
    .services-image:hover img {
      transform: scale(1.03);
    }
    
    .services-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-4);
    }
    
    .service-card {
      background-color: var(--neutral-50);
      border-radius: 10px;
      padding: var(--space-3);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      animation: fadeInUp 0.6s ease-out both;
    }
    
    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      background-color: white;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Staggered animation for service cards */
    .services-grid .service-card:nth-child(1) { animation-delay: 0.1s; }
    .services-grid .service-card:nth-child(2) { animation-delay: 0.2s; }
    .services-grid .service-card:nth-child(3) { animation-delay: 0.3s; }
    .services-grid .service-card:nth-child(4) { animation-delay: 0.4s; }
    .services-grid .service-card:nth-child(5) { animation-delay: 0.5s; }
    .services-grid .service-card:nth-child(6) { animation-delay: 0.6s; }
    
    .service-icon {
      color: var(--primary-500);
      margin-bottom: var(--space-2);
    }
    
    .service-title {
      margin-bottom: var(--space-1);
      font-size: 1.2rem;
    }
    
    .service-description {
      color: var(--neutral-600);
      font-size: 0.95rem;
      margin-bottom: var(--space-2);
      flex-grow: 1;
    }
    
    .service-link {
      color: var(--primary-500);
      font-weight: 600;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      margin-top: auto;
    }
    
    .arrow {
      transition: transform 0.3s ease;
      margin-left: var(--space-1);
    }
    
    .service-link:hover .arrow {
      transform: translateX(5px);
    }
    
    @media (max-width: 992px) {
      .services-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      .services-intro {
        grid-template-columns: 1fr;
      }
      
      .services-image {
        order: -1;
      }
      
      .services-text {
        padding-right: 0;
        text-align: center;
      }
    }
    
    @media (max-width: 576px) {
      .services-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ServicesComponent {
  services: Service[] = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 18H5c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v14c0 .55-.45 1-1 1zM7 9h2v7H7zm4-2h2v9h-2zm4 4h2v5h-2z"></path></svg>`,
      title: 'Personal Banking',
      description: 'Tailored accounts, loans, and savings products with smart digital tools to manage your finances.'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M3.5 21h17a1.5 1.5 0 0 0 0-3h-17a1.5 1.5 0 0 0 0 3zm0-6h17a1.5 1.5 0 0 0 0-3h-17a1.5 1.5 0 0 0 0 3zm0-6h17a1.5 1.5 0 0 0 0-3h-17a1.5 1.5 0 0 0 0 3z"></path></svg>`,
      title: 'Business Solutions',
      description: 'Comprehensive banking services for businesses of all sizes, from startups to enterprises.'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M21 11.646V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9.354A3.985 3.985 0 0 1 2 9V3a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v6c0 1.014-.378 1.94-1 2.646zm-2 1.228a4.007 4.007 0 0 1-4-1.228A3.99 3.99 0 0 1 12 13a3.99 3.99 0 0 1-3-1.354 3.99 3.99 0 0 1-4 1.228V20h14v-7.126zM14 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM6 9a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm11-4H7v2h10V5z"></path></svg>`,
      title: 'Digital Banking',
      description: 'Access your accounts anytime, anywhere with our secure and feature-rich mobile and online banking.'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-3a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-2a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path></svg>`,
      title: 'Investments',
      description: 'Grow your wealth with our range of investment products and advisory services.'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M2 20h20v2H2v-2zm2-8h2v7H4v-7zm5 0h2v7H9v-7zm4 0h2v7h-2v-7zm5 0h2v7h-2v-7zM2 7l10-5 10 5v4H2V7zm2 1.236V9h16v-.764l-8-4-8 4z"></path></svg>`,
      title: 'Mortgages & Loans',
      description: 'Competitive rates with flexible terms for home loans, personal loans, and lines of credit.'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M4 8h16v13H4V8zm1 1v11h14V9H5zm6 10h2v-8h-2v8zm-4.05-1v-7H8.5v7H6.95zM12.5 9h4a2.5 2.5 0 0 1 0 5h-2v3h-2V9z"></path></svg>`,
      title: 'Insurance Services',
      description: 'Protect what matters most with our range of insurance products for life, health, and property.'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M12 11a5 5 0 0 1 5 5v6h-2v-6a3 3 0 0 0-2.824-2.995L12 13a3 3 0 0 0-2.995 2.824L9 16v6H7v-6a5 5 0 0 1 5-5zm-6.5 3c.279 0 .55.033.81.094a5.947 5.947 0 0 0-.301 1.575L6 16v.086a1.492 1.492 0 0 0-.356-.08L5.5 16a1.5 1.5 0 0 0-1.493 1.356L4 17.5V22H2v-4.5A3.5 3.5 0 0 1 5.5 14zm13 0a3.5 3.5 0 0 1 3.5 3.5V22h-2v-4.5a1.5 1.5 0 0 0-1.356-1.493L18.5 16c-.175 0-.343.03-.5.085V16c0-.666-.108-1.306-.308-1.904.258-.063.53-.096.808-.096zm-13-6a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm13 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm-13 2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm13 0a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zM12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path></svg>`,
      title: 'Wealth Management',
      description: 'Personalized wealth planning, retirement solutions, and estate planning services.'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="30" height="30"><path d="M9.33 11.5h2.17A4.5 4.5 0 0 1 16 16H8.999L9 17h8v-1a5.578 5.578 0 0 0-.886-3H19a3 3 0 0 1 3 3v3c0 .552-.448 1-1 1h-6.8a3.001 3.001 0 0 1-5.4 0H2a1 1 0 0 1-1-1v-3a3 3 0 0 1 3-3h5.33zM12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm2-13a2 2 0 0 1 2 2v1h3.5a1.5 1.5 0 0 1 1.5 1.5v3.628a7.514 7.514 0 0 0-1-.12V16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-4.5A1.5 1.5 0 0 1 5.5 10H9V9c0-1.105.895-2 2-2h1V5h2v2h-2zm0 1h-3v1h4v-1h-1z"></path></svg>`,
      title: 'International Banking',
      description: 'Global banking solutions for individuals and businesses, including foreign currency and international transfers.'
    }
  ];
}

