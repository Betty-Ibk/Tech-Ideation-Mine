import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { style } from '@angular/animations';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <div class="nav-left">
            <!-- <button class="menu-toggle" (click)="toggleMenu()" [class.active]="isMenuOpen">
              <span class="menu-icon"></span>
            </button> -->
           <button class="menu-toggle" 
        (click)="toggleMenu()" 
        [class.active]="isMenuOpen"
        aria-label="Toggle navigation menu">
            <!-- Menu Icon -->
            <svg *ngIf="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
            </svg>
            <!-- Close Icon -->
            <svg *ngIf="isMenuOpen" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </button>
            <div class="logo">
              <img src="assets/images/gtco-logo.png" alt="GTCO Logo" class="logo-image">
              <div class="logo-text-container">
                <span class="logo-text">IDEATION</span>
                <span class="logo-subtitle"> Mine</span>
              </div>
            </div>
          </div>
          
          <div class="nav-actions">
            <a routerLink="/new-idea" class="btn btn-primary pulse-animation">
             <span class="btn-text">+ New Idea</span>
            <span class="btn-text-mobile">+</span>  
           </a>
            <div class="user-profile" (click)="toggleUserMenu()">
              <img [src]="currentUser?.profileImage || defaultProfileImage" alt="User Avatar" class="avatar">
              <span class="username">{{ currentUser?.name || 'User' }}</span>
              
              <div class="user-menu" *ngIf="isUserMenuOpen">
                <a routerLink="/account" class="user-menu-item">My Profile</a>
                <a *ngIf="isAdmin" routerLink="/admin" class="user-menu-item">Admin Dashboard</a>
                <a (click)="logout()" class="user-menu-item">Logout</a>
              </div>
            </div>
            <button class="theme-toggle" (click)="toggleTheme()" aria-label="Toggle theme">
              <ng-container *ngIf="theme$ | async as currentTheme">
                <span class="theme-icon" *ngIf="currentTheme === 'dark'">☀️</span>
                <span class="theme-icon" *ngIf="currentTheme === 'light'">🌙</span>
              </ng-container>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <aside class="sidebar" [class.active]="isMenuOpen || isLargeScreen">
      <div class="sidebar-header">
        <img src="assets/images/gtco-logo.png" alt="GTCO Logo" class="sidebar-logo">
        <h3 class="sidebar-title">Ideation Mine</h3>
      </div>
      <div class="sidebar-content">
        <nav class="nav-menu">
          <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item" (click)="closeMenuIfSmallScreen()">
            <span class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ff7a00"><path d="M513.33-580v-260H840v260H513.33ZM120-446.67V-840h326.67v393.33H120ZM513.33-120v-393.33H840V-120H513.33ZM120-120v-260h326.67v260H120Zm66.67-393.33H380v-260H186.67v260ZM580-186.67h193.33v-260H580v260Zm0-460h193.33v-126.66H580v126.66Zm-393.33 460H380v-126.66H186.67v126.66ZM380-513.33Zm200-133.34Zm0 200ZM380-313.33Z"/></svg></span>
            <span class="nav-label">Dashboard</span>
          </a>
          <a routerLink="/popular" routerLinkActive="active" class="nav-item" (click)="closeMenuIfSmallScreen()">
            <span class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ff7a00"><path d="m480-174-25.13-23.03Q355.31-288 290.44-353.12q-64.88-65.11-102.77-114.74-37.9-49.63-52.79-89.51Q120-597.25 120-636.92q0-75.06 50.95-126.07Q221.9-814 296.92-814q54.05 0 100.77 28.54T480-702.15q37.54-55.75 83.44-83.8Q609.34-814 663.08-814q75.02 0 125.97 51.01T840-636.92q0 39.67-14.88 79.55-14.89 39.88-52.73 89.4-37.84 49.52-102.64 114.74-64.8 65.23-164.62 156.2L480-174Zm0-45.59q97.47-88.64 160.42-151.86 62.94-63.22 99.85-110.25 36.91-47.02 51.4-83.35 14.48-36.34 14.48-71.78 0-61.53-40.82-102.43-40.82-40.89-102.1-40.89-49.76 0-91.18 28.8-41.41 28.81-76.72 88.68h-30.82q-35.92-59.97-77.19-88.73-41.28-28.75-90.55-28.75-60.51 0-101.72 40.89-41.2 40.9-41.2 102.72 0 35.29 14.57 71.65 14.56 36.37 51.12 83.39 36.56 47.01 99.95 109.97Q382.87-308.56 480-219.59Zm0-280.28Z"/></svg></span>
            <span class="nav-label">Popular</span>
          </a>
          <a 
            [routerLink]="isAdmin ? '/admin/my-ideas' : '/my-ideas'" 
            routerLinkActive="active" 
            class="nav-item" 
            (click)="closeMenuIfSmallScreen()"
          >
            <span class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ff7a00"><path d="M480-113.85q-27.77 0-48.45-18.5-20.68-18.5-24.01-46.27h144.92q-3.33 27.77-24.01 46.27-20.68 18.5-48.45 18.5ZM339.18-256.36v-33.85h281.64v33.85H339.18Zm1.02-110.92q-55.71-37.98-87.96-93.59Q220-516.49 220-585.18q0-107.87 76.06-183.94 76.07-76.06 183.94-76.06t183.94 76.06Q740-693.05 740-585.18q0 68.69-32.17 124.31-32.16 55.61-88.03 93.59H340.2Zm10.88-33.85h258q45.97-32 71.52-80.13 25.55-48.12 25.55-103.92 0-94.1-66.02-160.13Q574.1-811.33 480-811.33t-160.13 66.02q-66.02 66.03-66.02 160.13 0 55.8 25.55 103.92 25.55 48.13 71.68 80.13Zm128.92 0Z"/></svg></span>
            <span class="nav-label">My Ideas</span>
          </a>
          
          <a *ngIf="isAdmin" 
             routerLink="/admin" 
             routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item" (click)="closeMenuIfSmallScreen()">
          <span class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ff7a00"><path d="M400-483.33q-66 0-109.67-43.67-43.66-43.67-43.66-109.67t43.66-109.66Q334-790 400-790t109.67 43.67q43.66 43.66 43.66 109.66T509.67-527Q466-483.33 400-483.33ZM80-162.67v-100q0-34.33 17.33-62.66 17.34-28.34 49.34-43.34 65-30 127.33-45.33 62.33-15.33 126-15.33h12.33q6.34 0 11.67.66-6.67 15.34-10.5 30.84t-6.17 35.16H400q-62.33 0-118.17 14.34Q226-334 174.67-308.67q-13.67 7-20.84 19.67-7.16 12.67-7.16 26.33v33.34H410q5.33 19 13.33 35.5T442-162.67H80ZM658-120l-10.67-64q-15.33-5-30.5-13.17Q601.67-205.33 590-216l-56 14-30-50.67 46.67-42.66q-2-10.67-2-25.34 0-14.66 2-25.33L504-388.67l30-50.66 56 14q11.67-10.67 26.83-18.84 15.17-8.16 30.5-13.16l10.67-64h62.67l10.66 64q15.34 5 30.5 13.33 15.17 8.33 26.84 19.33l56-14.66 30 51.33L828-345.33q2 10 2 25t-2 25l46.67 42.66-30 50.67-56-14q-11.67 10.67-26.84 18.83-15.16 8.17-30.5 13.17l-10.66 64H658Zm31.33-120.67q35 0 57.5-22.5t22.5-57.5q0-35-22.5-57.5t-57.5-22.5q-35 0-57.5 22.5t-22.5 57.5q0 35 22.5 57.5t57.5 22.5ZM400-550q37 0 61.83-24.83 24.84-24.84 24.84-61.84t-24.84-61.83Q437-723.33 400-723.33t-61.83 24.83q-24.84 24.83-24.84 61.83t24.84 61.84Q363-550 400-550Zm0-86.67Zm10 407.34Z"/></svg></span>
            <span class="nav-label">Admin</span>
          </a>
          <a routerLink="/idea-feed" routerLinkActive="active" class="nav-item" (click)="closeMenuIfSmallScreen()">
            <span class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ff7a00"><path d="M490.83-345.67q67.5 0 114.5-43.05t47-104.28q0-53.67-34.55-91.5T534-622.33q-43.67 0-74.5 28.33t-30.83 69.07q0 17.6 6.83 34.26 6.83 16.67 20.17 31l48.33-47q-4.33-3-6.5-7.5t-2.17-9.83q0-13 10.34-21.83 10.33-8.84 28.33-8.84 22 0 37.33 17.84Q586.67-519 586.67-492q0 33.79-27.17 57.23-27.17 23.44-67.5 23.44-49.8 0-84.23-39.67-34.44-39.67-34.44-97.72 0-30.61 11.34-58.11 11.33-27.5 32.66-48.84l-47.66-47.66q-30.67 29.66-47.34 69.52-16.66 39.85-16.66 83.6 0 85.54 54 145.04 54.01 59.5 131.16 59.5ZM240-80v-172q-57-52-88.5-121.5T120-520q0-150 105-255t255-105q125 0 221.5 73.5T827-615l54 213.67q4.33 15.66-5.67 28.5-10 12.83-26.66 12.83H760v133.33q0 27.5-19.58 47.09Q720.83-160 693.33-160H600v80h-66.67v-146.67h160v-200h112l-42.66-171.66q-23.67-95-102.67-155t-180-60q-122 0-207.67 84.66-85.66 84.67-85.66 206.36 0 62.95 25.71 119.6Q238.1-346.06 285.33-302l21.34 20v202H240Zm256-366.67Z"/></svg></span>
            <span class="nav-label">Idea Feed</span>
          </a>
          <a routerLink="/account" routerLinkActive="active" class="nav-item" (click)="closeMenuIfSmallScreen()">
            <span class="nav-icon"><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#ff7a00"><path d="M480-480.67q-66 0-109.67-43.66Q326.67-568 326.67-634t43.66-109.67Q414-787.33 480-787.33t109.67 43.66Q633.33-700 633.33-634t-43.66 109.67Q546-480.67 480-480.67ZM160-160v-100q0-36.67 18.5-64.17T226.67-366q65.33-30.33 127.66-45.5 62.34-15.17 125.67-15.17t125.33 15.5q62 15.5 127.28 45.3 30.54 14.42 48.96 41.81Q800-296.67 800-260v100H160Zm66.67-66.67h506.66V-260q0-14.33-8.16-27-8.17-12.67-20.5-19-60.67-29.67-114.34-41.83Q536.67-360 480-360t-111 12.17Q314.67-335.67 254.67-306q-12.34 6.33-20.17 19-7.83 12.67-7.83 27v33.33ZM480-547.33q37 0 61.83-24.84Q566.67-597 566.67-634t-24.84-61.83Q517-720.67 480-720.67t-61.83 24.84Q393.33-671 393.33-634t24.84 61.83Q443-547.33 480-547.33Zm0-86.67Zm0 407.33Z"/></svg></span>
            <span class="nav-label">Account</span>
          </a>
        </nav>
      </div>
      <div class="sidebar-footer">
        <p>© 2025 GTCO</p>
      </div>
    </aside>
    
    <div class="sidebar-overlay" *ngIf="!isLargeScreen && isMenuOpen" (click)="closeMenu()"></div>
  `,
  styles: [`
    .navbar {
      background-color: var(--navbar-bg);
      box-shadow: 0 2px 8px var(--shadow-color);
      padding: var(--space-2) 0;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      transition: all 0.3s ease;
      color: var(--text-primary);
    }

    .container {
      padding-left: 0;
      max-width: 100%;
    }

    .nav-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
      width: 100%;
    }

    .nav-left {
      display: flex;
      align-items: center;
      gap: var(--space-3);
      padding-left: 0;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding-left: var(--space-2);
    }

    .menu-toggle {
      display: none;
      align-items: center;
      justify-content: center;
      background: none;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      color: var(--primary-600);
      transition: background-color 0.3s;
    }

    .menu-toggle:hover {
      background-color: var(--primary-50);
    }

    .menu-toggle.active .menu-icon {
      background-color: transparent;
    }

    .menu-toggle.active .menu-icon::before {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .menu-toggle.active .menu-icon::after {
      transform: rotate(-45deg) translate(5px, -5px);
    }

    .menu-icon {
      display: block;
      width: 24px;
      height: 2px;
      background-color: var(--primary-600);
      position: relative;
      transition: background-color 0.3s;
    }

    .menu-icon::before,
    .menu-icon::after {
      content: '';
      position: absolute;
      width: 24px;
      height: 2px;
      background-color: var(--primary-600);
      transition: transform 0.3s;
    }

    .menu-icon::before {
      top: -6px;
    }

    .menu-icon::after {
      bottom: -6px;
    }

    .logo-image {
      width: 40px;
      height: 40px;
      border-radius: 4px;
      transition: transform 0.3s ease;
    }

    .logo:hover .logo-image {
      transform: scale(1.05);
    }

    .logo-text-container {
      display: flex;
      flex-direction: column;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--primary-600);
      line-height: 1.2;
    }

    .logo-subtitle {
      font-size: 0.875rem;
      color: var(--primary-400);
    }

    .search-bar {
      flex: 1;
      max-width: 500px;
      position: relative;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid var(--neutral-200);
      border-radius: 6px;
      font-size: 0.875rem;
      transition: all 0.3s ease;
    }

    .search-input:focus {
      outline: none;
      border-color: var(--primary-500);
      box-shadow: 0 0 0 3px rgba(255, 122, 0, 0.1);
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      position: relative;
      cursor: pointer;
      padding: 6px 10px;
      border-radius: 30px;
      transition: background-color 0.3s;
    }

    .user-profile:hover {
      background-color: var(--primary-50);
    }

    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 2px solid var(--primary-300);
      transition: transform 0.3s ease;
    }

    .user-profile:hover .avatar {
      transform: scale(1.05);
    }

    .username {
      font-size: 0.875rem;
      color: var(--neutral-700);
    }
    
    .user-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      width: 200px;
      margin-top: 8px;
      z-index: 10;
      overflow: hidden;
    }
    
    .user-menu-item {
      display: block;
      padding: 12px 16px;
      color: var(--neutral-700);
      text-decoration: none;
      transition: all 0.2s ease;
    }
    
    .user-menu-item:hover {
      background-color: var(--primary-50);
      color: var(--primary-700);
    }

    /* Sidebar Styles */
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      width: 240px;
      height: 100vh;
      background-color: var(--sidebar-bg);
      box-shadow: 2px 0 8px var(--shadow-color);
      z-index: 99;
      transform: translateX(-100%);
      transition: transform 0.3s ease-in-out, background-color 0.3s ease;
      display: flex;
      flex-direction: column;
      color: var(--text-primary);
    }

    .sidebar.active {
      transform: translateX(0);
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      padding: var(--space-3) var(--space-3);
      border-bottom: 1px solid var(--neutral-100);
      gap: var(--space-2);
    }

    .sidebar-logo {
      width: 32px;
      height: 32px;
      border-radius: 4px;
    }

    .sidebar-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--primary-600);
    }

    .sidebar-content {
      flex: 1;
      padding: var(--space-3) 0;
      overflow-y: auto;
    }

    .sidebar-footer {
      padding: var(--space-2) var(--space-3);
      border-top: 1px solid var(--neutral-100);
      font-size: 0.75rem;
      color: var(--neutral-500);
      text-align: center;
    }

    .nav-menu {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 10px var(--space-3);
      color: var(--neutral-700);
      text-decoration: none;
      transition: all 0.2s ease;
      border-left: 3px solid transparent;
    }

    .nav-item:hover {
      background-color: var(--primary-50);
      color: var(--primary-700);
      border-left-color: var(--primary-300);
    }

    .nav-item.active {
      background-color: var(--primary-50);
      color: var(--primary-700);
      border-left-color: var(--primary-500);
      font-weight: 500;
    }

    .nav-icon {
      margin-right: var(--space-2);
      font-size: 1.2rem;
    }

    .sidebar-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: -1;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .sidebar.active + .sidebar-overlay {
      opacity: 1;
      visibility: visible;
    }

    /* Animation */
    .pulse-animation {
      animation: pulse 2s infinite;
      box-shadow: 0 0 0 0 rgba(255, 122, 0, 0.7);
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 122, 0, 0.7);
      }
      70% {
        transform: scale(1.05);
        box-shadow: 0 0 0 10px rgba(255, 122, 0, 0);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 0 0 0 rgba(255, 122, 0, 0);
      }
    }

    .theme-toggle {
      background: none;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .theme-toggle:hover {
      background-color: var(--bg-tertiary);
    }

    .theme-icon {
      font-size: 1.2rem;
    }

    @media (max-width: 992px) {
      .menu-toggle {
        display: flex;
      }

      .search-bar {
        display: none;
      }
      
      .sidebar-overlay {
        display: block;
      }
    }

    @media (min-width: 993px) {
      .sidebar-overlay {
        display: none;
      }
    }

    @media (max-width: 576px) {
      .username {
        display: none;
      }
    }
    .new-idea-btn {
      position: relative;
      transition: all 0.3s ease;
    }

.btn-text-mobile {
  display: none;
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .new-idea-btn {
    padding: 8px 12px;
    font-size: 0.875rem;
    min-width: auto;
  }
  
  .btn-text {
    display: none;
  }
  
  .btn-text-mobile {
    display: inline-block;
    font-size: 1.2rem;
    font-weight: 600;
  }
  
  /* Reduce pulse animation intensity on mobile */
  .pulse-animation {
    animation: pulse-mobile 2s infinite;
  }
  
  @keyframes pulse-mobile {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 122, 0, 0.5);
    }
    70% {
      transform: scale(1.02);
      box-shadow: 0 0 0 5px rgba(255, 122, 0, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 122, 0, 0);
    }
  }
}

@media (max-width: 480px) {
  .new-idea-btn {
    padding: 6px 10px;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
}

  /* Hide only the logo image on smaller screens, keep the text */
@media (max-width: 768px) {
  .logo-image {
    display: none;
  }
  
  /* Reduce gap in logo when image is hidden */
  .logo {
    gap: 0;
  }
}

/* For very small screens */
@media (max-width: 576px) {
  .logo-image {
    display: none;
  }
  
  /* Make logo text slightly smaller on very small screens */
  .logo-text {
    font-size: 1.25rem;
  }
  
  .logo-subtitle {
    font-size: 0.75rem;
  }
  
  /* Reduce gaps to maximize space for icons */
  .nav-actions {
    gap: var(--space-2);
  }
}
    /* Dark theme overrides */
    :host-context([data-theme="dark"]) .navbar {
      background-color: var(--navbar-bg);
    }

    :host-context([data-theme="dark"]) .logo-text {
      color: var(--primary-500);
    }

    :host-context([data-theme="dark"]) .logo-subtitle {
      color: var(--primary-400);
    }

    :host-context([data-theme="dark"]) .username {
      color: var(--primary-500);
    }

    :host-context([data-theme="dark"]) .sidebar {
      background-color: var(--sidebar-bg);
    }

    :host-context([data-theme="dark"]) .sidebar-title {
      color: var(--primary-500);
    }

    :host-context([data-theme="dark"]) .nav-item {
      color: white;
    }

    :host-context([data-theme="dark"]) .nav-item:hover {
      background-color: var(--primary-900);
      color: var(--primary-300);
      border-left-color: var(--primary-500);
    }

    :host-context([data-theme="dark"]) .nav-item.active {
      background-color: var(--primary-800);
      color: var(--primary-300);
      border-left-color: var(--primary-500);
    }

    :host-context([data-theme="dark"]) .sidebar-footer {
      color: white;
      border-top-color: #3a3a3a;
    }

    :host-context([data-theme="dark"]) .user-menu {
      background-color: var(--bg-secondary);
      border-color: var(--border-color);
    }

    :host-context([data-theme="dark"]) .user-menu-item {
      color: white;
    }

    :host-context([data-theme="dark"]) .user-menu-item:hover {
      background-color: var(--primary-800);
      color: var(--primary-300);
    }
  `]
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isUserMenuOpen = false;
  isLargeScreen = false;
  defaultProfileImage = 'https://randomuser.me/api/portraits/women/33.jpg';
  theme$ = this.themeService.theme$;
  
  constructor(private authService: AuthService, private themeService: ThemeService) {}
  
  ngOnInit() {
    this.checkScreenSize();
  }
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }
  
  checkScreenSize() {
    this.isLargeScreen = window.innerWidth >= 993;
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get isAdmin() {
    return this.authService.isAdmin();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (!this.isLargeScreen) {
      document.body.classList.toggle('sidebar-open', this.isMenuOpen);
    }
  }

  closeMenu() {
    if (!this.isLargeScreen) {
      this.isMenuOpen = false;
      document.body.classList.remove('sidebar-open');
    }
  }
  
  closeMenuIfSmallScreen() {
    if (!this.isLargeScreen) {
      this.closeMenu();
    }
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  toggleTheme() {
    // Force immediate repaint by accessing offsetHeight
    document.body.offsetHeight;
    
    this.themeService.toggleTheme();
    
    // Force browser to repaint immediately
    requestAnimationFrame(() => {
      document.body.style.display = 'none';
      document.body.offsetHeight; // Force reflow
      document.body.style.display = '';
    });
  }

  logout() {
    this.authService.logout();
    this.isUserMenuOpen = false;
  }
}

