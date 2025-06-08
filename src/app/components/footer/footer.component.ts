import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="footer-logo">
              <span class="logo-text">GTCO</span>
              <span class="logo-tagline">Bank</span>
            </div>
            <p class="brand-tagline">Democratizing Branch Innovation</p>
            <div class="social-links">
              <a href="#" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"></path>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"></path>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"></path>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12.001 2C6.47895 2 2.00098 6.47795 2.00098 12C2.00098 16.991 5.65795 21.127 10.4385 21.88V14.892H7.89795V12H10.4385V9.797C10.4385 7.291 11.9305 5.907 14.215 5.907C15.309 5.907 16.455 6.102 16.455 6.102V8.562H15.191C13.951 8.562 13.5635 9.333 13.5635 10.124V12H16.334L15.891 14.892H13.5635V21.88C18.344 21.129 22.001 16.991 22.001 12C22.001 6.47795 17.523 2 12.001 2Z"></path>
                </svg>
              </a>
              <a href="#" class="social-link">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 17.5229 6.47813 22 12.001 22C17.5238 22 22.001 17.5229 22.001 12C22.001 6.47715 17.5238 2 12.001 2ZM7.00195 12.1377C7.00195 9.57715 9.15234 7.42676 11.7129 7.42676C13.0293 7.42676 14.2734 7.99512 15.0938 8.80176C14.5723 8.76074 13.9844 8.9082 13.4355 9.27051C12.9512 9.58887 12.5215 10.1299 12.3984 10.8086C12.2812 11.4502 12.4414 12.0977 12.8242 12.5361C12.7637 12.5156 12.7012 12.4971 12.6367 12.4824C11.9902 12.3535 11.3203 12.5273 10.8672 12.9932C10.5352 13.3301 10.334 13.7139 10.2441 14.1191H8.96582C8.70801 13.6143 8.57227 13.0596 8.57227 12.4824L7.00195 12.1377ZM15.0352 16.6738H8.96582C8.67187 16.1504 8.57227 15.5605 8.70801 14.999C8.80762 14.5938 9.00977 14.2158 9.33398 13.9131C9.78711 13.4834 10.4219 13.3096 11.043 13.4385C11.2988 13.4941 11.5332 13.5938 11.7422 13.7227C11.7832 13.75 11.8203 13.7813 11.8535 13.8145L13.4238 13.4697C13.4238 15.373 14.7695 16.6738 16.4082 16.6738H15.0352ZM16.0352 13.4844C15.6484 13.0459 15.4883 12.3984 15.6055 11.7568C15.7285 11.0781 16.1582 10.5371 16.6426 10.2188C17.1914 9.85645 17.7793 9.70898 18.3008 9.75C17.5176 10.4971 17.0488 11.5215 17.0488 12.6484C17.0488 13.0225 17.1035 13.3818 17.2031 13.7227L16.0352 13.4844Z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div class="footer-nav">
            <div class="nav-column">
              <h3 class="nav-title">Personal Banking</h3>
              <ul class="nav-list">
                <li><a href="#">Checking & Savings</a></li>
                <li><a href="#">Credit Cards</a></li>
                <li><a href="#">Home Loans</a></li>
                <li><a href="#">Personal Loans</a></li>
                <li><a href="#">Auto Financing</a></li>
              </ul>
            </div>
            
            <div class="nav-column">
              <h3 class="nav-title">Business Banking</h3>
              <ul class="nav-list">
                <li><a href="#">Business Accounts</a></li>
                <li><a href="#">Merchant Services</a></li>
                <li><a href="#">Business Lending</a></li>
                <li><a href="#">Treasury Management</a></li>
                <li><a href="#">Industry Solutions</a></li>
              </ul>
            </div>
            
            <div class="nav-column">
              <h3 class="nav-title">Resources</h3>
              <ul class="nav-list">
                <li><a href="#">Financial Education</a></li>
                <li><a href="#">Security Center</a></li>
                <li><a href="#">Calculators</a></li>
                <li><a href="#">Mobile Banking</a></li>
                <li><a href="#">Branch Locator</a></li>
              </ul>
            </div>
            
            <div class="nav-column">
              <h3 class="nav-title">Company</h3>
              <ul class="nav-list">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">News & Insights</a></li>
                <li><a href="#">Investor Relations</a></li>
                <li><a href="#">Community Impact</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <div class="copyright">
            <p>© 2025 GTCO Bank. All rights reserved.</p>
          </div>
          
          <div class="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
        
        <div class="disclaimer">
          <p>
            GTCO Bank is a Member FDIC and Equal Housing Lender. Banking products are subject to approval and are provided by GTCO Bank. 
            Investment and Insurance products are: NOT FDIC INSURED • NOT BANK GUARANTEED • MAY LOSE VALUE • NOT A DEPOSIT • NOT INSURED BY ANY FEDERAL GOVERNMENT AGENCY
          </p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--neutral-800);
      color: white;
      padding: var(--space-6) 0 var(--space-4);
      position: relative;
    }
    
    .footer-content {
      display: grid;
      grid-template-columns: 1fr 3fr;
      gap: var(--space-5);
      padding-bottom: var(--space-5);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .footer-brand {
      display: flex;
      flex-direction: column;
    }
    
    .footer-logo {
      display: flex;
      flex-direction: column;
      margin-bottom: var(--space-2);
    }
    
    .logo-text {
      font-size: 2rem;
      font-weight: 800;
      color: var(--primary-500);
      letter-spacing: -1px;
    }
    
    .logo-tagline {
      font-size: 1rem;
      color: var(--neutral-300);
      font-weight: 500;
      margin-top: -8px;
    }
    
    .brand-tagline {
      color: var(--neutral-400);
      margin-bottom: var(--space-3);
    }
    
    .social-links {
      display: flex;
      gap: var(--space-2);
    }
    
    .social-link {
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    
    .social-link:hover {
      background-color: var(--primary-500);
      transform: translateY(-3px);
    }
    
    .footer-nav {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-4);
    }
    
    .nav-title {
      color: white;
      font-size: 1.1rem;
      margin-bottom: var(--space-2);
      position: relative;
      padding-bottom: var(--space-1);
    }
    
    .nav-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 2px;
      background-color: var(--primary-500);
    }
    
    .nav-list {
      list-style-type: none;
      padding-left: 0;
    }
    
    .nav-list li {
      margin-bottom: 10px;
    }
    
    .nav-list a {
      color: var(--neutral-400);
      transition: all 0.2s ease;
      font-size: 0.95rem;
    }
    
    .nav-list a:hover {
      color: white;
      padding-left: 5px;
    }
    
    .footer-bottom {
      display: flex;
      justify-content: space-between;
      padding: var(--space-4) 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .copyright {
      color: var(--neutral-500);
      font-size: 0.9rem;
    }
    
    .legal-links {
      display: flex;
      gap: var(--space-3);
    }
    
    .legal-links a {
      color: var(--neutral-400);
      font-size: 0.9rem;
      transition: color 0.2s ease;
    }
    
    .legal-links a:hover {
      color: white;
    }
    
    .disclaimer {
      padding-top: var(--space-3);
    }
    
    .disclaimer p {
      color: var(--neutral-500);
      font-size: 0.8rem;
      line-height: 1.5;
    }
    
    @media (max-width: 992px) {
      .footer-content {
        grid-template-columns: 1fr;
        gap: var(--space-4);
      }
      
      .footer-brand {
        align-items: center;
        text-align: center;
        margin-bottom: var(--space-3);
      }
      
      .footer-nav {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--space-3) var(--space-4);
      }
    }
    
    @media (max-width: 768px) {
      .footer-bottom {
        flex-direction: column;
        align-items: center;
        gap: var(--space-2);
      }
      
      .legal-links {
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--space-2) var(--space-3);
      }
      
      .disclaimer {
        text-align: center;
      }
    }
    
    @media (max-width: 576px) {
      .footer-nav {
        grid-template-columns: 1fr;
        gap: var(--space-3);
      }
      
      .nav-column {
        text-align: center;
      }
      
      .nav-title::after {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  `]
})
export class FooterComponent {}