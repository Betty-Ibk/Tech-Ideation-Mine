import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ThemeUtilsService } from '../../services/theme-utils.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="account-page">
      <div class="container">
        <h1 class="page-title" style="color: #FF7A00">My Account</h1>
        
        <div class="profile-card">
          <div class="profile-header">
            <div class="profile-avatar">
              <img [src]="currentUser?.profileImage || getDefaultProfileImage()" alt="Profile Picture">
            </div>
            <div class="profile-info">
              <h2 class="profile-name">{{ currentUser?.name || 'User' }}</h2>
              <p class="profile-role">{{ currentUser?.department || 'Department' }}</p>
              <p class="profile-stats">
                <span>{{ currentUser?.ideasSubmitted || 0 }} Ideas Submitted</span>
                <span>•</span>
                <span>{{ currentUser?.votesReceived || 0 }} Votes Received</span>
              </p>
            </div>
          </div>
        </div>

        <div class="account-sections">
          <div class="section-card">
            <div class="section-header">
              <h3 class="section-title">Personal Information</h3>
              <p class="section-description">Update your personal details and contact information</p>
            </div>
            <div class="section-content">
              <div class="form-group">
                <label>Display Name</label>
                <input type="text" [(ngModel)]="displayName" [placeholder]="currentUser?.name || 'Your Name'">
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input type="email" [(ngModel)]="email" [placeholder]="currentUser?.email || 'your.email@example.com'">
              </div>
              <div class="form-group">
                <label>Department</label>
                <input type="text" [(ngModel)]="department" [placeholder]="currentUser?.department || 'Your Department'">
              </div>
            </div>
          </div>
          
          <div class="section-card">
            <div class="section-header">
              <h3 class="section-title">Notification Settings</h3>
              <p class="section-description">Manage how and when you receive updates</p>
            </div>
            <div class="section-content">
              <div class="form-group checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" [(ngModel)]="notifyNewComments">
                  <span>Comments on my ideas</span>
                </label>
                <p class="option-description">Receive notifications when someone comments on your submitted ideas</p>
              </div>
              <div class="form-group checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" [(ngModel)]="notifyVotes">
                  <span>Votes on my ideas</span>
                </label>
                <p class="option-description">Get notified when your ideas receive new votes from colleagues</p>
              </div>
              <div class="form-group checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" [(ngModel)]="notifyStatusChanges">
                  <span>Status changes</span>
                </label>
                <p class="option-description">Be alerted when the status of your submitted ideas changes</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <button class="btn btn-primary" (click)="saveChanges()">Save Changes</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .account-page {
      padding: var(--space-5) 0;
      background-color: var(--neutral-50);
      min-height: 100vh;
    }
    
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 0 var(--space-4);
    }
    
    .page-title {
      margin-bottom: var(--space-5);
      font-size: 2rem;
      font-weight: 700;
      color: var(--neutral-800);
      text-align: center;
    }
    
    .profile-card {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      padding: var(--space-4);
      margin-bottom: var(--space-5);
    }
    
    .profile-header {
      display: flex;
      align-items: center;
      gap: var(--space-4);
    }
    
    .profile-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      overflow: hidden;
      border: 3px solid var(--primary-100);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    .profile-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .profile-info {
      flex: 1;
    }
    
    .profile-name {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--neutral-800);
      margin-bottom: var(--space-1);
    }
    
    .profile-role {
      font-size: 1.1rem;
      color: var(--primary-600);
      margin-bottom: var(--space-2);
    }
    
    .profile-stats {
      color: var(--neutral-600);
      display: flex;
      gap: var(--space-2);
      align-items: center;
    }
    
    .account-sections {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-4);
      margin-bottom: var(--space-5);
    }
    
    .section-card {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .section-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }
    
    .section-header {
      padding: var(--space-3) var(--space-4);
      border-bottom: 1px solid var(--neutral-100);
      background-color: var(--neutral-50);
    }
    
    .section-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--neutral-800);
      margin-bottom: var(--space-1);
    }
    
    .section-description {
      color: var(--neutral-600);
      font-size: 0.9rem;
    }
    
    .section-content {
      padding: var(--space-4);
    }
    
    .form-group {
      margin-bottom: var(--space-3);
    }
    
    .form-group label {
      display: block;
      margin-bottom: var(--space-1);
      font-weight: 500;
      color: var(--neutral-700);
    }
    
    .form-group input[type="text"],
    .form-group input[type="email"] {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid var(--neutral-300);
      border-radius: 6px;
      font-size: 1rem;
      transition: all 0.2s ease;
    }
    
    .form-group input:focus {
      outline: none;
      border-color: var(--primary-400);
      box-shadow: 0 0 0 3px rgba(255, 122, 0, 0.1);
    }
    
    .checkbox-group {
      margin-bottom: var(--space-3);
    }
    
    .checkbox-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-weight: 500;
    }
    
    .checkbox-label input {
      margin-right: var(--space-2);
      width: 18px;
      height: 18px;
      accent-color: var(--primary-500);
    }
    
    .option-description {
      margin-top: var(--space-1);
      margin-left: 30px;
      font-size: 0.85rem;
      color: var(--neutral-500);
    }
    
    .form-actions {
      display: flex;
      justify-content: center;
    }
    
    .btn-primary {
      background-color: var(--primary-500);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .btn-primary:hover {
      background-color: var(--primary-600);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    
    @media (min-width: 768px) {
      .account-sections {
        grid-template-columns: 1fr 1fr;
      }
    }
    
    @media (max-width: 767px) {
      .profile-header {
        flex-direction: column;
        text-align: center;
      }
      
      .profile-stats {
        justify-content: center;
        flex-wrap: wrap;
      }
    }
    
    /* Dark theme support */
    :host-context([data-theme="dark"]) .account-page {
      background-color: var(--bg-primary);
    }
    
    :host-context([data-theme="dark"]) .profile-card,
    :host-context([data-theme="dark"]) .section-card {
      background-color: var(--card-bg);
      color: var(--text-primary);
    }
    
    :host-context([data-theme="dark"]) .profile-name,
    :host-context([data-theme="dark"]) .section-title {
      color: var(--text-primary);
    }
    
    :host-context([data-theme="dark"]) .profile-role,
    :host-context([data-theme="dark"]) .section-description {
      color: var(--text-secondary);
    }
    
    :host-context([data-theme="dark"]) .profile-stats,
    :host-context([data-theme="dark"]) .option-description {
      color: var(--text-tertiary);
    }
    
    :host-context([data-theme="dark"]) .form-group input[type="text"],
    :host-context([data-theme="dark"]) .form-group input[type="email"] {
      background-color: var(--bg-tertiary);
      color: var(--text-primary);
      border-color: var(--border-color);
    }
    
    :host-context([data-theme="dark"]) .form-group input:focus {
      border-color: var(--primary-400);
      box-shadow: 0 0 0 3px rgba(255, 122, 0, 0.2);
    }
    
    :host-context([data-theme="dark"]) .section-header {
      background-color: var(--bg-secondary);
      border-color: var(--border-color);
    }
    
    :host-context([data-theme="dark"]) .checkbox-label {
      color: var(--text-primary);
    }
  `]
})
export class AccountComponent implements OnInit {
  currentUser: any;
  displayName: string = '';
  email: string = '';
  department: string = '';
  notifyNewComments: boolean = true;
  notifyVotes: boolean = true;
  notifyStatusChanges: boolean = true;
  
  constructor(
    private authService: AuthService,
    private themeUtils: ThemeUtilsService
  ) {}
  
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.displayName = this.currentUser.name;
      this.email = this.currentUser.email;
      this.department = this.currentUser.department;
      this.notifyNewComments = this.currentUser.notifyNewComments !== false;
      this.notifyVotes = this.currentUser.notifyVotes !== false;
      this.notifyStatusChanges = this.currentUser.notifyStatusChanges !== false;
    }
    
    // Apply dark mode styling
    this.themeUtils.applyDarkModeStyles('.profile-card, .section-card');
    
    // Listen for theme changes
    this.themeUtils.setupThemeChangeListener('.profile-card, .section-card');
  }
  
  getDefaultProfileImage(): string {
    // Return different default images based on user role
    if (this.currentUser?.role === 'admin') {
      return 'https://randomuser.me/api/portraits/men/42.jpg';
    } else {
      return 'https://randomuser.me/api/portraits/women/33.jpg';
    }
  }
  
  saveChanges(): void {
    if (this.currentUser) {
      // Update the user object
      this.currentUser.name = this.displayName;
      this.currentUser.email = this.email;
      this.currentUser.department = this.department;
      this.currentUser.notifyNewComments = this.notifyNewComments;
      this.currentUser.notifyVotes = this.notifyVotes;
      this.currentUser.notifyStatusChanges = this.notifyStatusChanges;
      
      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      
      // Show success message
      console.log('Profile updated successfully');
      alert('Profile updated successfully');
    }
  }
}








