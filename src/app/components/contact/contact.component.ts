import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="contact" class="section contact">
      <div class="container">
        <div class="contact-container">
          <div class="contact-info animate-on-scroll">
            <span class="section-tag">Get In Touch</span>
            <h2 class="section-title">We're Here to <span class="text-primary">Help</span></h2>
            <p class="contact-text">
              Whether you have questions about our services, need assistance with your account, or want to learn more about how GTCO can help you achieve your financial goals, our team is ready to assist you.
            </p>
            
            <div class="contact-methods">
              <div class="contact-method">
                <div class="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M21 16.42v3.536a1 1 0 0 1-.93.998c-.437.03-.794.046-1.07.046-8.837 0-16-7.163-16-16 0-.276.015-.633.046-1.07A1 1 0 0 1 4.044 3H7.58a.5.5 0 0 1 .498.45c.023.23.044.413.064.552A13.901 13.901 0 0 0 9.35 8.003c.095.2.033.439-.147.567l-2.158 1.542a13.047 13.047 0 0 0 6.844 6.844l1.54-2.154a.462.462 0 0 1 .573-.149 13.901 13.901 0 0 0 4 1.205c.139.02.322.042.55.064a.5.5 0 0 1 .449.498z"></path>
                  </svg>
                </div>
                <div class="method-details">
                  <h3 class="method-title">Call Us</h3>
                  <p class="method-text">1-800-GTCO-BANK</p>
                  <p class="method-subtext">Mon-Fri, 7AM-10PM ET</p>
                </div>
              </div>
              
              <div class="contact-method">
                <div class="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm17 4.238l-7.928 7.1L4 7.216V19h16V7.238zM4.511 5l7.55 6.662L19.502 5H4.511z"></path>
                  </svg>
                </div>
                <div class="method-details">
                  <h3 class="method-title">Email Us</h3>
                  <p class="method-text">support&#64;gtcobank.com</p>
                  <p class="method-subtext">We'll respond within 24 hours</p>
                </div>
              </div>
              
              <div class="contact-method">
                <div class="method-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"></path>
                  </svg>
                </div>
                <div class="method-details">
                  <h3 class="method-title">Visit Us</h3>
                  <p class="method-text">Find a branch near you</p>
                  <a href="#branches" class="method-link">Branch Locator</a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="contact-form-container animate-on-scroll">
            <div class="form-card">
              <h3 class="form-title">Send us a message</h3>
              
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">
                <div class="form-group">
                  <label for="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    formControlName="name" 
                    [class.error]="name.invalid && (name.dirty || name.touched)"
                  >
                  <div *ngIf="name.invalid && (name.dirty || name.touched)" class="error-message">
                    Please enter your name
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    formControlName="email" 
                    [class.error]="email.invalid && (email.dirty || email.touched)"
                  >
                  <div *ngIf="email.invalid && (email.dirty || email.touched)" class="error-message">
                    Please enter a valid email
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="phone">Phone Number (Optional)</label>
                  <input type="tel" id="phone" formControlName="phone">
                </div>
                
                <div class="form-group">
                  <label for="subject">Subject</label>
                  <select 
                    id="subject" 
                    formControlName="subject"
                    [class.error]="subject.invalid && (subject.dirty || subject.touched)"
                  >
                    <option value="">Select a topic</option>
                    <option value="account">Account Inquiries</option>
                    <option value="loans">Loans & Mortgages</option>
                    <option value="investments">Investments</option>
                    <option value="digital">Digital Banking</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                  <div *ngIf="subject.invalid && (subject.dirty || subject.touched)" class="error-message">
                    Please select a subject
                  </div>
                </div>
                
                <div class="form-group">
                  <label for="message">Message</label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    formControlName="message"
                    [class.error]="message.invalid && (message.dirty || message.touched)"
                  ></textarea>
                  <div *ngIf="message.invalid && (message.dirty || message.touched)" class="error-message">
                    Please enter your message
                  </div>
                </div>
                
                <div class="form-submit">
                  <button type="submit" class="btn btn-primary" [disabled]="contactForm.invalid || isSubmitting">
                    {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                  </button>
                </div>
                
                <div *ngIf="submitted" class="form-success">
                  Your message has been sent! We'll get back to you soon.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact {
      background-color: var(--neutral-50);
      position: relative;
    }
    
    .contact::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 40%;
      height: 40%;
      background: linear-gradient(135deg, rgba(255, 122, 0, 0.05), transparent);
      z-index: 1;
    }
    
    .contact-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-5);
      position: relative;
      z-index: 2;
    }
    
    .contact-info {
      display: flex;
      flex-direction: column;
    }
    
    .contact-text {
      color: var(--neutral-600);
      line-height: 1.7;
      margin-bottom: var(--space-4);
    }
    
    .contact-methods {
      margin-top: var(--space-3);
    }
    
    .contact-method {
      display: flex;
      gap: var(--space-3);
      margin-bottom: var(--space-3);
      padding: var(--space-3);
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
    }
    
    .contact-method:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }
    
    .method-icon {
      background-color: rgba(255, 122, 0, 0.1);
      color: var(--primary-500);
      width: 48px;
      height: 48px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .method-title {
      font-size: 1.1rem;
      margin-bottom: 4px;
    }
    
    .method-text {
      color: var(--neutral-800);
      margin-bottom: 2px;
    }
    
    .method-subtext {
      font-size: 0.9rem;
      color: var(--neutral-500);
    }
    
    .method-link {
      color: var(--primary-500);
      font-weight: 500;
      display: inline-block;
      margin-top: 4px;
      font-size: 0.9rem;
    }
    
    .contact-form-container {
      display: flex;
      align-items: center;
    }
    
    .form-card {
      background-color: white;
      border-radius: 12px;
      padding: var(--space-4);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      width: 100%;
    }
    
    .form-title {
      font-size: 1.5rem;
      margin-bottom: var(--space-3);
      color: var(--neutral-800);
      text-align: center;
    }
    
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
    }
    
    .form-group label {
      font-size: 0.9rem;
      font-weight: 500;
      margin-bottom: 6px;
      color: var(--neutral-700);
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
      padding: 10px 12px;
      border: 1px solid var(--neutral-300);
      border-radius: 6px;
      font-size: 1rem;
      color: var(--neutral-800);
      transition: all 0.3s ease;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      border-color: var(--primary-400);
      outline: none;
      box-shadow: 0 0 0 3px rgba(255, 122, 0, 0.1);
    }
    
    .form-group .error {
      border-color: var(--error-500);
    }
    
    .error-message {
      color: var(--error-500);
      font-size: 0.8rem;
      margin-top: 4px;
    }
    
    .form-submit {
      margin-top: var(--space-2);
    }
    
    .form-submit .btn {
      width: 100%;
      padding: 12px;
    }
    
    .form-success {
      background-color: rgba(34, 197, 94, 0.1);
      color: var(--success-500);
      padding: var(--space-2);
      border-radius: 6px;
      margin-top: var(--space-2);
      text-align: center;
    }
    
    @media (max-width: 992px) {
      .contact-container {
        grid-template-columns: 1fr;
      }
      
      .contact-info {
        order: -1;
      }
    }
  `]
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  submitted = false;
  
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
  
  get name() { return this.contactForm.get('name')!; }
  get email() { return this.contactForm.get('email')!; }
  get subject() { return this.contactForm.get('subject')!; }
  get message() { return this.contactForm.get('message')!; }
  
  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }
    
    this.isSubmitting = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.submitted = true;
      this.contactForm.reset();
    }, 1500);
  }
}