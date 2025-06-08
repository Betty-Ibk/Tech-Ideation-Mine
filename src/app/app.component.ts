import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd, Scroll } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  template: `
    <app-navbar *ngIf="!isLoginPage"></app-navbar>
    <main [class.with-navbar]="!isLoginPage">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }
    
    .with-navbar {
      padding-top: 64px;
      padding-left: 0;
    }
    
    @media (min-width: 993px) {
      .with-navbar {
        padding-left: 240px;
      }
    }
  `]
})
export class AppComponent implements OnInit {
  isLoginPage = true; // Default to true to hide navbar initially

  constructor(
    private router: Router,
    private authService: AuthService,
    private viewportScroller: ViewportScroller
  ) {
    // Handle navigation events to check for login page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isLoginPage = event.urlAfterRedirects === '/login' || event.url === '/login';
    });

    // Handle scroll events to ensure page starts at top
    this.router.events.pipe(
      filter(event => event instanceof Scroll)
    ).subscribe((event: Scroll) => {
      // If it's a navigation to a new page (not a fragment/anchor on same page)
      if (event.routerEvent instanceof NavigationEnd && !event.anchor) {
        // Scroll to top
        setTimeout(() => {
          this.viewportScroller.scrollToPosition([0, 0]);
        });
      }
    });
  }
  
  ngOnInit() {
    // Check if this is a page refresh
    const isPageRefresh = window.performance && 
      window.performance.navigation && 
      window.performance.navigation.type === 1;
    
    // If it's a page refresh and not already on login page, redirect to login
    if (isPageRefresh && !this.isLoginPage) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
    
    // Disable browser's automatic scroll restoration
    this.viewportScroller.setHistoryScrollRestoration('manual');
    
    // Listen for beforeunload event to handle refresh
    window.addEventListener('beforeunload', () => {
      // We don't need to do anything here, just having the listener
      // will help us detect refreshes in combination with performance API
    });
    
    // Apply theme immediately without delay
    document.body.classList.add('theme-loaded');
  }
}
