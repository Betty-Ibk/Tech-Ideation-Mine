import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn()) {
    return true;
  }
  
  // Redirect to the login page
  return router.parseUrl('/login');
};

export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }
  
  // If logged in but not admin, redirect to dashboard
  if (authService.isLoggedIn()) {
    console.log('User is logged in but not an admin');
    return router.parseUrl('/dashboard');
  }
  
  // Otherwise redirect to login
  console.log('User is not logged in, redirecting to login');
  return router.parseUrl('/login');
};
