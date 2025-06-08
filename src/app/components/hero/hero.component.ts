import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="hero">
      <div class="container hero-container">
        <div class="hero-content">
          <h1 class="hero-title slide-up">Banking Reimagined for <span class="highlight">Everyone</span></h1>
          <p class="hero-subtitle slide-up">GTCO is democratizing branch innovation with smart, accessible, and personalized banking solutions for all.</p>
          
          <div class="hero-cta slide-up">
            <a href="#features" class="btn btn-primary btn-lg">Discover Innovation</a>
            <a href="#contact" class="btn btn-outline btn-lg">Contact Us</a>
          </div>
          
          <div class="hero-stats slide-up">
            <div class="stat">
              <span class="stat-number">250+</span>
              <span class="stat-label">Smart Branches</span>
            </div>
            <div class="stat">
              <span class="stat-number">1.2M+</span>
              <span class="stat-label">Happy Customers</span>
            </div>
            <div class="stat">
              <span class="stat-number">24/7</span>
              <span class="stat-label">Digital Access</span>
            </div>
          </div>
        </div>
        
        <div class="hero-image slide-up">
          <div class="image-wrapper">
            <img src="https://images.pexels.com/photos/7821738/pexels-photo-7821738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Modern Banking Experience">
          </div>
        </div>
      </div>
      
      <div class="hero-wave">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" fill="#ffffff"></path>
        </svg>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
      color: white;
      padding-top: 120px;
      position: relative;
      overflow: hidden;
    }
    
    .hero-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4);
      padding: var(--space-6) 0 var(--space-8);
      position: relative;
      z-index: 2;
    }
    
    .hero-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .hero-title {
      font-size: 3rem;
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: var(--space-2);
      color: white;
    }
    
    .highlight {
      color: var(--neutral-50);
      position: relative;
      display: inline-block;
    }
    
    .highlight::after {
      content: '';
      position: absolute;
      bottom: 8px;
      left: 0;
      width: 100%;
      height: 8px;
      background-color: rgba(255, 255, 255, 0.2);
      z-index: -1;
    }
    
    .hero-subtitle {
      font-size: 1.2rem;
      margin-bottom: var(--space-4);
      opacity: 0.9;
      max-width: 90%;
    }
    
    .hero-cta {
      display: flex;
      gap: var(--space-2);
      margin-bottom: var(--space-4);
    }
    
    .hero-stats {
      display: flex;
      gap: var(--space-4);
      margin-top: var(--space-3);
    }
    
    .stat {
      display: flex;
      flex-direction: column;
    }
    
    .stat-number {
      font-size: 1.8rem;
      font-weight: 700;
      color: white;
    }
    
    .stat-label {
      font-size: 0.9rem;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .hero-image {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .image-wrapper {
      width: 100%;
      max-width: 500px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
      transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
      transition: all 0.5s ease;
    }
    
    .image-wrapper:hover {
      transform: perspective(1000px) rotateY(0) rotateX(0);
    }
    
    .image-wrapper img {
      width: 100%;
      height: auto;
      display: block;
    }
    
    .hero-wave {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      line-height: 0;
    }
    
    .hero-wave svg {
      display: block;
      width: 100%;
      height: 120px;
    }
    
    @media (max-width: 992px) {
      .hero-title {
        font-size: 2.5rem;
      }
      
      .image-wrapper {
        max-width: 100%;
      }
    }
    
    @media (max-width: 768px) {
      .hero-container {
        grid-template-columns: 1fr;
      }
      
      .hero-content {
        text-align: center;
        align-items: center;
      }
      
      .hero-subtitle {
        max-width: 100%;
      }
      
      .hero-image {
        margin-top: var(--space-4);
        order: 2;
      }
      
      .image-wrapper {
        transform: none;
      }
      
      .hero-title {
        font-size: 2.2rem;
      }
    }
    
    @media (max-width: 576px) {
      .hero-stats {
        flex-direction: column;
        gap: var(--space-2);
        align-items: center;
      }
      
      .hero-cta {
        flex-direction: column;
        width: 100%;
      }
      
      .hero-cta .btn {
        width: 100%;
      }
    }
  `]
})
export class HeroComponent {}