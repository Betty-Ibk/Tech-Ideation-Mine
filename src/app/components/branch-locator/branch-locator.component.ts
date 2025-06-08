import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Branch {
  id: number;
  name: string;
  address: string;
  city: string;
  type: string;
  hours: string;
  features: string[];
}

@Component({
  selector: 'app-branch-locator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="branches" class="section branch-locator">
      <div class="container">
        <div class="section-header text-center animate-on-scroll">
          <span class="section-tag">Find Us</span>
          <h2 class="section-title">Locate Our <span class="text-primary">Smart Branches</span></h2>
          <p class="section-subtitle">Experience the future of banking at a GTCO branch near you</p>
        </div>
        
        <div class="branch-finder animate-on-scroll">
          <div class="branch-search">
            <div class="search-form">
              <div class="form-group">
                <label for="city">Find branches in:</label>
                <select id="city" [(ngModel)]="selectedCity" (change)="filterBranches()">
                  <option value="all">All Locations</option>
                  <option *ngFor="let city of cities" [value]="city">{{city}}</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="type">Branch Type:</label>
                <select id="type" [(ngModel)]="selectedType" (change)="filterBranches()">
                  <option value="all">All Types</option>
                  <option *ngFor="let type of branchTypes" [value]="type">{{type}}</option>
                </select>
              </div>
              
              <button class="btn btn-primary" (click)="filterBranches()">Search</button>
            </div>
            
            <div class="branch-list">
              <div *ngFor="let branch of filteredBranches" class="branch-card" (click)="selectBranch(branch)">
                <h3 class="branch-name">{{branch.name}}</h3>
                <p class="branch-address">{{branch.address}}, {{branch.city}}</p>
                <div class="branch-type">{{branch.type}}</div>
                <div class="branch-hours">{{branch.hours}}</div>
              </div>
              
              <div *ngIf="filteredBranches.length === 0" class="no-results">
                No branches found matching your criteria. Please try adjusting your search.
              </div>
            </div>
          </div>
          
          <div class="branch-details">
            <div *ngIf="selectedBranch" class="branch-info">
              <h3 class="info-title">{{selectedBranch.name}}</h3>
              <p class="info-address">{{selectedBranch.address}}, {{selectedBranch.city}}</p>
              
              <div class="info-box">
                <div class="info-header">
                  <span class="info-label">Branch Type</span>
                  <span class="info-value">{{selectedBranch.type}}</span>
                </div>
                
                <div class="info-header">
                  <span class="info-label">Hours</span>
                  <span class="info-value">{{selectedBranch.hours}}</span>
                </div>
                
                <div class="info-features">
                  <h4>Features</h4>
                  <ul class="features-list">
                    <li *ngFor="let feature of selectedBranch.features">{{feature}}</li>
                  </ul>
                </div>
                
                <div class="info-actions">
                  <a href="#" class="btn btn-primary">Get Directions</a>
                  <a href="#contact" class="btn btn-outline">Schedule Appointment</a>
                </div>
              </div>
            </div>
            
            <div *ngIf="!selectedBranch" class="no-branch-selected">
              <div class="placeholder-content">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="64" height="64">
                  <path d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm9 6h1v5h-8v-5h1v-1a3 3 0 0 1 6 0v1zm-2 0v-1a1 1 0 0 0-2 0v1h2z"></path>
                </svg>
                <p>Select a branch from the list to view details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .branch-locator {
      background-color: white;
    }
    
    .branch-finder {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-4);
      margin-top: var(--space-5);
    }
    
    .search-form {
      background-color: var(--neutral-50);
      padding: var(--space-3);
      border-radius: 8px;
      margin-bottom: var(--space-3);
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
      align-items: flex-end;
    }
    
    .form-group {
      flex: 1;
      min-width: 200px;
    }
    
    .form-group label {
      display: block;
      margin-bottom: var(--space-1);
      font-weight: 500;
      color: var(--neutral-700);
    }
    
    select {
      width: 100%;
      padding: 10px;
      border: 1px solid var(--neutral-300);
      border-radius: 6px;
      background-color: white;
      font-size: 1rem;
      color: var(--neutral-800);
    }
    
    .branch-list {
      max-height: 400px;
      overflow-y: auto;
      margin-top: var(--space-2);
    }
    
    .branch-card {
      background-color: white;
      border: 1px solid var(--neutral-200);
      border-radius: 8px;
      padding: var(--space-2);
      margin-bottom: var(--space-2);
      cursor: pointer;
      transition: all 0.3s ease;
      animation: slideInRight 0.5s ease-out both;
    }
    
    .branch-card:hover {
      border-color: var(--primary-300);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transform: translateY(-2px);
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    /* Staggered animation for branch cards */
    .branch-list .branch-card:nth-child(1) { animation-delay: 0.1s; }
    .branch-list .branch-card:nth-child(2) { animation-delay: 0.15s; }
    .branch-list .branch-card:nth-child(3) { animation-delay: 0.2s; }
    .branch-list .branch-card:nth-child(4) { animation-delay: 0.25s; }
    .branch-list .branch-card:nth-child(5) { animation-delay: 0.3s; }
    
    .branch-name {
      font-size: 1.1rem;
      margin-bottom: 4px;
      color: var(--neutral-800);
    }
    
    .branch-address {
      font-size: 0.9rem;
      color: var(--neutral-600);
      margin-bottom: 6px;
    }
    
    .branch-type {
      display: inline-block;
      font-size: 0.8rem;
      background-color: var(--primary-100);
      color: var(--primary-700);
      padding: 2px 8px;
      border-radius: 4px;
      margin-right: 6px;
    }
    
    .branch-hours {
      font-size: 0.85rem;
      color: var(--neutral-500);
      margin-top: 4px;
    }
    
    .branch-details {
      background-color: var(--neutral-50);
      border-radius: 8px;
      height: 100%;
      min-height: 400px;
    }
    
    .branch-info {
      padding: var(--space-3);
    }
    
    .info-title {
      font-size: 1.5rem;
      margin-bottom: 6px;
      color: var(--primary-600);
    }
    
    .info-address {
      font-size: 1rem;
      color: var(--neutral-600);
      margin-bottom: var(--space-3);
    }
    
    .info-box {
      background-color: white;
      border-radius: 8px;
      padding: var(--space-3);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    
    .info-header {
      display: flex;
      justify-content: space-between;
      padding-bottom: var(--space-2);
      margin-bottom: var(--space-2);
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .info-label {
      font-weight: 600;
      color: var(--neutral-700);
    }
    
    .info-value {
      color: var(--neutral-600);
    }
    
    .info-features {
      margin-top: var(--space-3);
      margin-bottom: var(--space-3);
    }
    
    .info-features h4 {
      font-size: 1.1rem;
      margin-bottom: var(--space-1);
    }
    
    .features-list {
      list-style-type: none;
      padding-left: 0;
    }
    
    .features-list li {
      padding: 6px 0;
      color: var(--neutral-700);
      display: flex;
      align-items: center;
    }
    
    .features-list li:before {
      content: "✓";
      color: var(--primary-500);
      margin-right: 8px;
    }
    
    .info-actions {
      display: flex;
      gap: var(--space-2);
      margin-top: var(--space-3);
    }
    
    .no-branch-selected {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 400px;
    }
    
    .placeholder-content {
      text-align: center;
      color: var(--neutral-500);
    }
    
    .placeholder-content svg {
      opacity: 0.3;
      margin-bottom: var(--space-2);
    }
    
    .no-results {
      padding: var(--space-3);
      text-align: center;
      color: var(--neutral-600);
      background-color: white;
      border-radius: 8px;
      border: 1px dashed var(--neutral-300);
    }
    
    @media (max-width: 992px) {
      .branch-finder {
        grid-template-columns: 1fr;
      }
      
      .branch-details {
        min-height: 300px;
      }
    }
  `]
})
export class BranchLocatorComponent {
  branches: Branch[] = [
    {
      id: 1,
      name: "GTCO Headquarters",
      address: "123 Finance Avenue",
      city: "New York",
      type: "Flagship Branch",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-1PM",
      features: ["24/7 ATMs", "Smart Banking Kiosks", "Financial Advisors", "Business Center", "Coffee Shop", "Free WiFi"]
    },
    {
      id: 2,
      name: "GTCO Downtown",
      address: "456 Main Street",
      city: "New York",
      type: "Smart Branch",
      hours: "Mon-Fri: 9AM-5PM, Sat: 10AM-2PM",
      features: ["24/7 ATMs", "Digital Banking Zone", "Video Banking", "Free WiFi"]
    },
    {
      id: 3,
      name: "GTCO Innovation Hub",
      address: "789 Tech Plaza",
      city: "San Francisco",
      type: "Digital Branch",
      hours: "Mon-Fri: 9AM-5PM",
      features: ["Self-Service Kiosks", "Virtual Reality Banking Demo", "Co-working Space", "Innovation Lab"]
    },
    {
      id: 4,
      name: "GTCO Financial Center",
      address: "101 Commerce Street",
      city: "Chicago",
      type: "Full-Service Branch",
      hours: "Mon-Fri: 8:30AM-5:30PM, Sat: 9AM-12PM",
      features: ["24/7 ATMs", "Safe Deposit Boxes", "Mortgage Specialists", "Investment Advisors"]
    },
    {
      id: 5,
      name: "GTCO Community Branch",
      address: "202 Neighborhood Way",
      city: "Miami",
      type: "Community Branch",
      hours: "Mon-Fri: 9AM-4PM, Sat: 9AM-12PM",
      features: ["Multilingual Staff", "Community Event Space", "Financial Education Center", "Small Business Support"]
    },
    {
      id: 6,
      name: "GTCO Express",
      address: "303 Quick Street",
      city: "Chicago",
      type: "Express Branch",
      hours: "Mon-Sat: 10AM-7PM, Sun: 11AM-4PM",
      features: ["Extended Hours", "In-and-Out Services", "Digital Banking Assistance"]
    }
  ];
  
  filteredBranches: Branch[] = [...this.branches];
  selectedBranch: Branch | null = null;
  selectedCity: string = 'all';
  selectedType: string = 'all';
  
  get cities(): string[] {
    const citySet = new Set(this.branches.map(branch => branch.city));
    return Array.from(citySet);
  }
  
  get branchTypes(): string[] {
    const typeSet = new Set(this.branches.map(branch => branch.type));
    return Array.from(typeSet);
  }
  
  filterBranches() {
    this.filteredBranches = this.branches.filter(branch => {
      const cityMatch = this.selectedCity === 'all' || branch.city === this.selectedCity;
      const typeMatch = this.selectedType === 'all' || branch.type === this.selectedType;
      return cityMatch && typeMatch;
    });
    
    // Reset selected branch if it's not in filtered results
    if (this.selectedBranch && !this.filteredBranches.includes(this.selectedBranch)) {
      this.selectedBranch = null;
    }
  }
  
  selectBranch(branch: Branch) {
    this.selectedBranch = branch;
  }
}
