import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { IdeaService, IdeaPost } from '../../../services/idea.service';
import { ThemeUtilsService } from '../../../services/theme-utils.service';

interface Comment {
  id: number;
  text: string;
  authorHash: string;
  timestamp: string;
  ideaId: number | string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  currentUser = this.authService.getCurrentUser();
  totalUsers = 7000;
  totalIdeas = 0;
  totalVotes = 0;
  totalComments = 0;
  topIdeas: IdeaPost[] = [];
  recentActivities: any[] = [];
  selectedIdea: IdeaPost | null = null;
  selectedIdeaForComments: IdeaPost | null = null;
  filteredIdeas: IdeaPost[] = [];
  searchQuery: string = '';
  filterStatus: string = 'all';
  ideaComments: Comment[] = [];
  newComment: string = '';
  private subscription = new Subscription();
  private anonymousIdMap: Map<string, number> = new Map();
  
  constructor(
    private authService: AuthService,
    private ideaService: IdeaService,
    private themeUtils: ThemeUtilsService
  ) {}
  
  ngOnInit(): void {
    // Load ideas and calculate statistics
    this.loadIdeas();
    this.loadRecentActivities();
    this.loadComments();
    
    // Apply dark mode styling to admin dashboard components
    this.themeUtils.applyDarkModeStyles('.admin-section, .stat-card, .top-idea-card, .activity-item, .modal-container');
    
    // Listen for theme changes
    this.themeUtils.setupThemeChangeListener('.admin-section, .stat-card, .top-idea-card, .activity-item, .modal-container');
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  loadIdeas(): void {
    this.ideaService.getIdeas().subscribe(ideas => {
      this.totalIdeas = ideas.length;
      this.totalVotes = ideas.reduce((total, idea) => total + idea.upvotes + idea.downvotes, 0);
      
      // Get top ideas by total votes
      this.topIdeas = [...ideas]
        .sort((a, b) => (b.upvotes + b.downvotes) - (a.upvotes + a.downvotes))
        .slice(0, 5);
      
      this.filteredIdeas = ideas;
      this.applyFilters();
    });
  }
  
  loadComments(): void {
    // More realistic comment data with different comments for each idea
    this.ideaComments = [
      // Comments for idea 1
      { id: 1, text: "This is a great idea! I think we should prioritize this for Q3.", authorHash: "user#1001", timestamp: "2 days ago", ideaId: 1 },
      { id: 2, text: "I think we should consider the budget implications before proceeding.", authorHash: "user#2002", timestamp: "1 day ago", ideaId: 1 },
      { id: 3, text: "Has anyone done a cost analysis for this yet?", authorHash: "user#3003", timestamp: "12 hours ago", ideaId: 1 },
      
      // Comments for idea 2
      { id: 4, text: "Could we implement this by Q3? It seems like a high priority.", authorHash: "user#4004", timestamp: "3 days ago", ideaId: 2 },
      { id: 5, text: "The tech team already has this on their roadmap for next quarter.", authorHash: "user#5005", timestamp: "2 days ago", ideaId: 2 },
      { id: 6, text: "I've seen something similar at our competitor, it's working well for them.", authorHash: "user#1001", timestamp: "1 day ago", ideaId: 2 },
      
      // Comments for idea 3
      { id: 7, text: "This would greatly improve our customer satisfaction scores.", authorHash: "user#6006", timestamp: "4 days ago", ideaId: 3 },
      { id: 8, text: "We need to ensure compliance with regulations before implementing.", authorHash: "user#7007", timestamp: "3 days ago", ideaId: 3 },
      
      // Comments for idea 4
      { id: 9, text: "This seems like a fun idea for team building!", authorHash: "user#8008", timestamp: "2 days ago", ideaId: 4 },
      { id: 10, text: "I volunteer to organize this if approved!", authorHash: "user#9009", timestamp: "1 day ago", ideaId: 4 },
      { id: 11, text: "We should consider dietary restrictions if we do this.", authorHash: "user#1010", timestamp: "12 hours ago", ideaId: 4 },
      { id: 12, text: "Can we make this a monthly thing?", authorHash: "user#1111", timestamp: "6 hours ago", ideaId: 4 },
    ];
    
    this.totalComments = this.ideaComments.length;
  }
  
  loadRecentActivities(): void {
    // Mock data for recent activities
    this.recentActivities = [
      { type: 'new-idea', text: 'New idea submitted: "Mobile app redesign"', time: '2 hours ago' },
      { type: 'vote', text: 'EMP2001 voted on "Customer feedback system"', time: '3 hours ago' },
      { type: 'comment', text: 'EMP4006 commented on "Branch renovation plan"', time: '5 hours ago'},
      { type: 'new-idea', text: 'New idea submitted: "Employee training program"', time: '1 day ago' },
      { type: 'vote', text: 'EMP3001 voted on "Digital transformation strategy"', time: '1 day ago' }
    ];
  }

  getUserName(authorHash: string): string {
    // Ensure authorHash starts with EMP and has a 4-digit number
    if (authorHash.startsWith('EMP') && authorHash.length >= 7) {
      return `Employee ${authorHash}`;
    } else {
      // Format as EMP followed by 4 digits if not already in that format
      const empId = authorHash.startsWith('EMP') ? authorHash : `EMP${authorHash.substring(0, 4)}`;
      
      // Check if the ID after "EMP" contains non-numeric characters
      const idPart = empId.substring(3);
      if (!/^\d+$/.test(idPart)) {
        // If non-numeric, generate a random 4-digit number instead
        return `Employee EMP${1000 + Math.floor(Math.random() * 9000)}`;
      }
      
      return `Employee ${empId}`;
    }
  }
  
  getUserId(authorHash: string): string {
    // Extract ID from author hash
    return authorHash.split('#')[1] || '';
  }
  
  getUpvotePercentage(idea: IdeaPost): number {
    const total = idea.upvotes + idea.downvotes;
    return total > 0 ? (idea.upvotes / total) * 100 : 0;
  }
  
  getDownvotePercentage(idea: IdeaPost): number {
    const total = idea.upvotes + idea.downvotes;
    return total > 0 ? (idea.downvotes / total) * 100 : 0;
  }
  
  getCommentCount(ideaId: number | string): number {
    // Convert string ID to number if needed
    const numericId = typeof ideaId === 'string' ? parseInt(ideaId) : ideaId;
    return this.ideaComments.filter(comment => comment.ideaId === numericId).length;
  }
  
  getIdeaComments(ideaId: number | string): Comment[] {
    // Convert string ID to number if needed
    const numericId = typeof ideaId === 'string' ? parseInt(ideaId) : ideaId;
    return this.ideaComments.filter(comment => comment.ideaId === numericId);
  }
  
  viewIdeaDetails(idea: IdeaPost): void {
    this.selectedIdea = idea;
  }
  
  closeModal(): void {
    this.selectedIdea = null;
  }
  
  viewComments(idea: IdeaPost): void {
    this.selectedIdeaForComments = idea;
    // Close the idea details modal if it's open
    if (this.selectedIdea) {
      this.selectedIdea = null;
    }
  }
  
  closeCommentsModal(): void {
    this.selectedIdeaForComments = null;
    this.newComment = '';
  }
  
  addComment(): void {
    if (!this.newComment.trim() || !this.selectedIdeaForComments) return;
    
    // Create a new comment with Employee ID format instead of real name
    const newComment: Comment = {
      id: this.ideaComments.length + 1,
      text: this.newComment,
      authorHash: "EMP" + (this.currentUser?.id || '1000'), // Format as EMP followed by ID
      timestamp: "Just now",
      ideaId: this.selectedIdeaForComments.id // Use the ID directly without conversion
    };
    
    // Add to comments array
    this.ideaComments.unshift(newComment);
    this.totalComments++;
    
    // Add to recent activities
    this.recentActivities.unshift({
      type: 'comment',
      text: `Admin commented on "${this.selectedIdeaForComments.title}"`,
      time: 'Just now'
    });
    
    // Clear the input
    this.newComment = '';
    
    // Update statistics after adding a comment
    this.updateStatistics();
  }
  
  applyFilters(): void {
    this.subscription.add(
      this.ideaService.getIdeas().subscribe(ideas => {
        this.filteredIdeas = ideas.filter(idea => {
          // Filter by status
          if (this.filterStatus !== 'all' && (idea.status || 'pending') !== this.filterStatus) {
            return false;
          }
          
          // Filter by search query
          if (this.searchQuery && !idea.title.toLowerCase().includes(this.searchQuery.toLowerCase())) {
            return false;
          }
          
          return true;
        });
      })
    );
  }
  
  vote(idea: IdeaPost, voteType: 'up' | 'down'): void {
    // If user already voted the same way, remove the vote
    if (idea.userVote === voteType) {
      if (voteType === 'up') {
        idea.upvotes--;
      } else {
        idea.downvotes--;
      }
      idea.userVote = null;
    } 
    // If user voted the opposite way, switch the vote
    else if (idea.userVote) {
      if (voteType === 'up') {
        idea.downvotes--;
        idea.upvotes++;
      } else {
        idea.upvotes--;
        idea.downvotes++;
      }
      idea.userVote = voteType;
    } 
    // If user hasn't voted yet, add a new vote
    else {
      if (voteType === 'up') {
        idea.upvotes++;
      } else {
        idea.downvotes++;
      }
      idea.userVote = voteType;
    }
    
    // In a real app, you would call a service method to update the vote
    
    // Add to recent activities
    this.recentActivities.unshift({
      type: 'vote',
      text: `Admin ${voteType}voted on "${idea.title}"`,
      time: 'Just now'
    });
    
    // Update statistics after voting
    this.updateStatistics();
  }
  
  approveIdea(idea: IdeaPost): void {
    // Update idea status
    idea.status = 'approved';
    
    // Add to recent activities
    this.recentActivities.unshift({
      type: 'new-idea',
      text: `Admin approved idea: "${idea.title}"`,
      time: 'Just now'
    });
    
    // In a real app, you would call a service method to update the idea
    
    // Update statistics after approving an idea
    this.updateStatistics();
  }
  
  rejectIdea(idea: IdeaPost): void {
    // Update idea status
    idea.status = 'rejected';
    
    // Add to recent activities
    this.recentActivities.unshift({
      type: 'new-idea',
      text: `Admin rejected idea: "${idea.title}"`,
      time: 'Just now'
    });
    
    // In a real app, you would call a service method to update the idea
    
    // Update statistics after rejecting an idea
    this.updateStatistics();
  }
  
  implementIdea(idea: IdeaPost): void {
    // Update idea status
    idea.status = 'implemented';
    
    // Add to recent activities
    this.recentActivities.unshift({
      type: 'new-idea',
      text: `Admin marked idea as implemented: "${idea.title}"`,
      time: 'Just now'
    });
    
    // In a real app, you would call a service method to update the idea
    
    // Update statistics after implementing an idea
    this.updateStatistics();
  }
  
  // Add a new method to update statistics
  updateStatistics(): void {
    // Update total votes
    this.subscription.add(
      this.ideaService.getIdeas().subscribe(ideas => {
        this.totalVotes = ideas.reduce((total, idea) => total + idea.upvotes + idea.downvotes, 0);
        
        // Update top ideas by total votes
        this.topIdeas = [...ideas]
          .sort((a, b) => (b.upvotes + b.downvotes) - (a.upvotes + a.downvotes))
          .slice(0, 5);
      })
    );
    
    // Update total comments
    this.totalComments = this.ideaComments.length;
  }

  // Add this helper method to format file sizes
  formatFileSize(bytes: number | undefined): string {
    if (bytes === undefined) return '0 bytes';
    
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  }

  // Add this method to the component class
  getIdeaCategory(idea: IdeaPost): string {
    if (!idea.tags || idea.tags.length === 0) {
      return 'Not specified';
    }
    
    // Check for category tags (case-insensitive)
    const categoryTags = ['Technology', 'Welfare', 'HR', 'Training'];
    for (const tag of idea.tags) {
      for (const category of categoryTags) {
        if (tag.toLowerCase() === category.toLowerCase()) {
          return category;
        }
      }
    }
    
    // If no matching category found
    return 'Other';
  }
}


























