import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="features" class="section features">
      <div class="container">
        <div class="section-header text-center animate-on-scroll">
          <span class="section-tag">Branch Innovation</span>
          <h2 class="section-title">Democratizing <span class="text-primary">Banking</span> for All</h2>
          <p class="section-subtitle">We're transforming traditional banking with innovative technologies and inclusive services</p>
        </div>
        
        <div class="features-grid">
          <div *ngFor="let feature of features; let i = index" class="feature-card animate-on-scroll">
            <div class="feature-icon">
              <span [innerHTML]="feature.icon"></span>
            </div>
            <h3 class="feature-title">{{feature.title}}</h3>
            <p class="feature-description">{{feature.description}}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .features {
      background-color: var(--neutral-50);
      position: relative;
    }
    
    .section-header {
      max-width: 700px;
      margin: 0 auto var(--space-6);
    }
    
    .section-tag {
      display: inline-block;
      background-color: rgba(255, 122, 0, 0.1);
      color: var(--primary-600);
      padding: 6px 16px;
      border-radius: 50px;
      font-weight: 500;
      font-size: 0.9rem;
      margin-bottom: var(--space-2);
    }
    
    .section-title {
      margin-bottom: var(--space-2);
      font-size: 2.5rem;
    }
    
    .text-primary {
      color: var(--primary-500);
    }
    
    .section-subtitle {
      color: var(--neutral-600);
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-4);
      margin-top: var(--space-5);
    }
    
    .feature-card {
      background-color: white;
      border-radius: 12px;
      padding: var(--space-4);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      height: 100%;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }
    
    .feature-icon {
      background-color: rgba(255, 122, 0, 0.1);
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: var(--space-2);
    }
    
    .feature-icon svg {
      width: 30px;
      height: 30px;
      color: var(--primary-500);
    }
    
    .feature-title {
      margin-top: var(--space-2);
      margin-bottom: var(--space-1);
      font-size: 1.3rem;
    }
    
    .feature-description {
      color: var(--neutral-600);
      line-height: 1.6;
    }
    
    @media (max-width: 992px) {
      .features-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      .section-title {
        font-size: 2rem;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5zm7 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path></svg>`,
      title: 'Smart Branches',
      description: 'Experience our tech-enabled branches with self-service kiosks, digital advisors, and zero wait times.'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-8v2h2v-2h-2zm2-1.645A3.502 3.502 0 0 0 12 6.5a3.501 3.501 0 0 0-3.433 2.813l1.936.383A1.5 1.5 0 1 1 12 11.5a1 1 0 0 0-1 1V14h2v-.645z"></path></svg>`,
      title: 'Inclusive Banking',
      description: 'Banking services designed for everyone, regardless of financial background, with accessible tools and education.'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M10 20H6v2H4v-2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7V1.59a.5.5 0 0 1 .582-.493l10.582 1.764a1 1 0 0 1 .836.986V6h1v2h-1v7h1v2h-1v2.153a1 1 0 0 1-.836.986L20 20.333V22h-2v-1.333l-7.418 1.236A.5.5 0 0 1 10 21.41V20zm2-.36l8-1.334V4.694l-8-1.333v16.278zM16.5 14c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2 1.5.895 1.5 2-.672 2-1.5 2z"></path></svg>`,
      title: 'Mobile First',
      description: 'Full-featured mobile banking with intuitive interfaces, enabling all banking services from your smartphone.'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M21 3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h18zm-1 2H4v14h16V5zm-2 2v2H6V7h12zm-6 4v2H6v-2h6zm6 0v2h-4v-2h4zm-6 4v2H6v-2h6zm6 0v2h-4v-2h4z"></path></svg>`,
      title: 'Data-Driven Service',
      description: 'Personalized financial insights and recommendations based on your unique financial behavior.'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 10.9c-.61 0-1.1.49-1.1 1.1s.49 1.1 1.1 1.1c.61 0 1.1-.49 1.1-1.1s-.49-1.1-1.1-1.1zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"></path></svg>`,
      title: 'Community Focus',
      description: 'Branches designed to serve community needs with financial education programs and local business support.'
    },
    {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-4.987-3.744A7.966 7.966 0 0 0 12 20c1.97 0 3.773-.712 5.167-1.892A6.979 6.979 0 0 0 12.16 16a6.981 6.981 0 0 0-5.147 2.256zM5.616 16.82A8.975 8.975 0 0 1 12.16 14a8.972 8.972 0 0 1 6.362 2.634 8 8 0 1 0-12.906.187zM12 13a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path></svg>`,
      title: 'Personalized Banking',
      description: 'Customized financial solutions that adapt to your changing needs and life stages.'
    }
  ];
}