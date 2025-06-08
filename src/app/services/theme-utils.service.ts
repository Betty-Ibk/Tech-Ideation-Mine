import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeUtilsService {
  
  constructor() { }
  
  /**
   * Apply consistent dark mode styling to card elements
   * @param selector CSS selector for the elements to style
   */
  applyDarkModeStyles(selector: string = '.idea-card'): void {
    // Remove the setTimeout to eliminate delay
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      if (isDarkMode) {
        // Card elements in dark mode
        (element as HTMLElement).style.setProperty('background-color', 'var(--card-bg)', 'important');
        (element as HTMLElement).style.setProperty('color', 'white', 'important');
        
        // Find all text elements inside cards (excluding buttons)
        const textElements = element.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div:not(.btn):not(.button), label');
        textElements.forEach(textEl => {
          (textEl as HTMLElement).style.setProperty('color', 'white', 'important');
        });
      } else {
        // Light mode
        (element as HTMLElement).style.setProperty('background-color', 'white', 'important');
        (element as HTMLElement).style.setProperty('color', 'var(--text-primary)', 'important');
        
        // Reset text elements in light mode
        const textElements = element.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div:not(.btn):not(.button), label');
        textElements.forEach(textEl => {
          (textEl as HTMLElement).style.setProperty('color', 'var(--text-primary)', 'important');
        });
      }
    });
    
    // Apply styles to text elements outside cards
    if (isDarkMode) {
      const outsideTextElements = document.querySelectorAll('body > p, body > h1, body > h2, body > h3, body > h4, body > h5, body > h6, body > span, body > div:not(' + selector + '):not(.btn):not(.button) > p, body > div:not(' + selector + '):not(.btn):not(.button) > h1, body > div:not(' + selector + '):not(.btn):not(.button) > h2, body > div:not(' + selector + '):not(.btn):not(.button) > h3, body > div:not(' + selector + '):not(.btn):not(.button) > h4, body > div:not(' + selector + '):not(.btn):not(.button) > h5, body > div:not(' + selector + '):not(.btn):not(.button) > h6, body > div:not(' + selector + '):not(.btn):not(.button) > span');
      outsideTextElements.forEach(textEl => {
        (textEl as HTMLElement).style.setProperty('color', 'var(--primary-500)', 'important'); // Orange color
      });
    } else {
      // Reset outside text elements in light mode
      const outsideTextElements = document.querySelectorAll('body > p, body > h1, body > h2, body > h3, body > h4, body > h5, body > h6, body > span, body > div:not(' + selector + '):not(.btn):not(.button) > p, body > div:not(' + selector + '):not(.btn):not(.button) > h1, body > div:not(' + selector + '):not(.btn):not(.button) > h2, body > div:not(' + selector + '):not(.btn):not(.button) > h3, body > div:not(' + selector + '):not(.btn):not(.button) > h4, body > div:not(' + selector + '):not(.btn):not(.button) > h5, body > div:not(' + selector + '):not(.btn):not(.button) > h6, body > div:not(' + selector + '):not(.btn):not(.button) > span');
      outsideTextElements.forEach(textEl => {
        (textEl as HTMLElement).style.setProperty('color', 'var(--text-primary)', 'important');
      });
    }
  }
  
  /**
   * Set up a listener for theme changes that applies consistent styling
   * @param selector CSS selector for the elements to style
   */
  setupThemeChangeListener(selector: string = '.idea-card'): void {
    document.addEventListener('themeChanged', (e: Event) => {
      // Apply styles immediately
      this.applyDarkModeStyles(selector);
    });
  }
}

