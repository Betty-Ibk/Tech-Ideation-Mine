import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeKey = 'preferred-theme';
  private themeSubject = new BehaviorSubject<Theme>(this.getInitialTheme());
  
  theme$ = this.themeSubject.asObservable();
  
  constructor() {
    // Apply the initial theme immediately
    this.applyTheme(this.themeSubject.value);
    
    // Listen for system preference changes
    this.listenForSystemPreferenceChanges();
  }
  
  toggleTheme(): void {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
  
  setTheme(theme: Theme): void {
    // Update localStorage and subject immediately
    localStorage.setItem(this.themeKey, theme);
    this.themeSubject.next(theme);
    
    // Apply theme without any delay
    this.applyTheme(theme);
  }
  
  private getInitialTheme(): Theme {
    // Check for saved preference
    const savedTheme = localStorage.getItem(this.themeKey) as Theme | null;
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Default to light
    return 'light';
  }
  
  private applyTheme(theme: Theme): void {
    // Apply theme to document root immediately
    document.documentElement.setAttribute('data-theme', theme);
    
    // Add a class to body for additional theme control
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
    
    // Dispatch a custom event that components can listen for
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
  }
  
  private listenForSystemPreferenceChanges(): void {
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Only change theme if user hasn't set a preference
        if (!localStorage.getItem(this.themeKey)) {
          const newTheme: Theme = e.matches ? 'dark' : 'light';
          this.setTheme(newTheme);
        }
      });
    }
  }
}







