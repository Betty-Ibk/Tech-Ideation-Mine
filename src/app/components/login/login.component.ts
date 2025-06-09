import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="logo">
            <img src="assets/images/gtco-logo.png" alt="GTCO Logo" class="logo-image">
          </div>
          <p class="logo-subtitle">IDEATION MINE</p>
          <h2>Login</h2>
        </div>
        
        <div class="login-form">
          <div class="form-group">
            <label for="employeeId">Employee ID</label>
            <input 
              type="text" 
              id="employeeId" 
              [(ngModel)]="employeeId" 
              placeholder="Enter your employee ID"
              class="form-control"
            >
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              [(ngModel)]="password" 
              placeholder="Enter your password"
              class="form-control"
            >
          </div>
          
          <div *ngIf="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          
          <button (click)="login()" class="btn btn-primary login-btn" [disabled]="isLoggingIn">
            {{ isLoggingIn ? 'Logging in...' : 'Login' }}
          </button>
          
          <div class="login-help">
            <p>Default login credentials:</p>
            <p>Employee: EMP1001 / userpass</p>
            <p>Admin: ADMIN007 / adminpass</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
       display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: url('/assets/images/4884792.jpg') no-repeat center center;
      
      background-size: cover;
      padding: var(--space-4);

  
    }
    
    .login-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      width: 100%;
      max-width: 400px;
      padding: var(--space-4);
      animation: fadeIn 0.5s ease-in-out;
          
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .login-header {
      text-align: center;
      margin-bottom: var(--space-4);
    }
    
    .logo {
      display: flex;
      justify-content: center;
      margin-bottom: var(--space-2);
    }
    
    .logo-image {
      width: 120px;
      height: auto;
    }
    
    .logo-subtitle {
      color: var(--primary-600);
      margin-bottom: var(--space-3);
      font-size: 1.2rem;
      font-weight: bold;
    }
    
    .form-group {
      margin-bottom: var(--space-3);
    }
    
    label {
      display: block;
      margin-bottom: var(--space-1);
      font-weight: 500;
      color: var(--neutral-700);
    }
    
    .form-control {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--neutral-300);
      border-radius: 4px;
      font-size: 1rem;
      transition: all 0.2s ease;
    }
    
    .form-control:focus {
      outline: none;
      border-color: var(--primary-500);
      box-shadow: 0 0 0 3px rgba(255, 122, 0, 0.1);
    }
    
    .login-btn {
      width: 100%;
      margin-top: var(--space-2);
      padding: 12px;
      background-color: var(--primary-500);
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    .login-btn:hover {
      background-color: var(--primary-600);
    }
    
    .error-message {
      color: #e53e3e;
      margin-bottom: var(--space-2);
      font-size: 0.875rem;
    }
    
    .login-help {
      margin-top: var(--space-3);
      padding-top: var(--space-3);
      border-top: 1px solid var(--neutral-200);
      font-size: 0.875rem;
      color: var(--neutral-600);
    }
  `]
})
export class LoginComponent {
  employeeId: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoggingIn: boolean = false;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  login(): void {
    // Clear previous error messages
    this.errorMessage = '';
    
    // Debug log
    console.log('Login attempt with:', this.employeeId, this.password);
    
    // Validate inputs
    if (!this.employeeId || !this.password) {
      this.errorMessage = 'Please enter both employee ID and password';
      return;
    }
    
    // Set loading state
    this.isLoggingIn = true;
    
    // Attempt login
    this.authService.login(this.employeeId, this.password)
      .then(user => {
        console.log('Login successful:', user);
        this.isLoggingIn = false;
        
        // Navigate based on user role
        if (user?.role === 'admin') {
          console.log('Navigating to admin dashboard');
          this.router.navigate(['/admin/dashboard']);
        } else {
          console.log('Navigating to user dashboard');
          this.router.navigate(['/dashboard']);
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        this.isLoggingIn = false;
        this.errorMessage = 'Invalid employee ID or password';
      });
  }
}





