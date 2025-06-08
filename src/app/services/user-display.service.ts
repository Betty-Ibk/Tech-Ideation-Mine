import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDisplayService {
  // Use localStorage to persist IDs across page refreshes
  constructor() {}
  
  getDisplayName(authorId: string, isAdmin: boolean): string {
    if (!authorId) {
      return isAdmin ? 'Employee EMP1000' : 'Anonymous User 1000';
    }
    
    // If user is admin, show employee ID in standard format
    if (isAdmin) {
      // For admin view, always show EMP followed by 4 digits
      if (authorId.startsWith('EMP') && /^EMP\d{4}$/.test(authorId)) {
        return `Employee ${authorId}`;
      } else {
        // Get or create a consistent numeric ID
        const numericId = this.getOrCreateNumericId(authorId);
        return `Employee EMP${numericId}`;
      }
    }
    
    // For regular users, show Anonymous User with consistent ID
    const numericId = this.getOrCreateNumericId(authorId);
    return `Anonymous User ${numericId}`;
  }
  
  private getOrCreateNumericId(authorId: string): string {
    const storageKey = `user_id_${authorId}`;
    
    // Try to get existing ID from localStorage
    let numericId = localStorage.getItem(storageKey);
    
    if (!numericId) {
      // If no existing ID, create a deterministic one based on the authorId
      let hash = 0;
      for (let i = 0; i < authorId.length; i++) {
        hash = ((hash << 5) - hash) + authorId.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }
      
      // Generate a 4-digit number between 1000-9999
      numericId = (1000 + Math.abs(hash) % 9000).toString();
      
      // Store it for future use
      localStorage.setItem(storageKey, numericId);
    }
    
    return numericId;
  }
}


