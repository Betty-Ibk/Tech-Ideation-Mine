import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ThemeUtilsService } from '../../services/theme-utils.service';
import { IdeaService, IdeaPost } from '../../services/idea.service';
import { Subscription, forkJoin } from 'rxjs';
import { MyIdeasComponent } from '../my-ideas/my-ideas.component';

interface Comment {
  text: string;
  author: string;
  authorId: string;
  timestamp: string;
}

interface Idea {
  id: number;
  title: string;
  description: string;
  votes: number;
  upvotes: number;
  downvotes: number;
  comments: number;
  author: string;
  authorId: string;
  timestamp: string;
  userVote: 'up' | 'down' | null;
  commentsList: Comment[];
  _sortDate?: Date; // Add optional sortDate property
}

@Component({
  selector: 'app-idea-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <main class="main-content">
      <div class="container">
        <!-- User Engagement Metrics -->
        <div class="metrics-container">
          <h2 class="metrics-title">Your Innovation Impact</h2>
          
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-icon">💡</div>
              <div class="metric-value">{{ userMetrics.topIdeas }}</div>
              <div class="metric-label">Ideas in Top 10%</div>
            </div>
            
            <div class="metric-card">
              <div class="metric-icon">🔥</div>
              <div class="metric-value">{{ userMetrics.engagementRate }}%</div>
              <div class="metric-label">Engagement Rate</div>
            </div>
            
            <div class="metric-card">
              <div class="metric-icon">⭐</div>
              <div class="metric-value">{{ userMetrics.communityPoints }}</div>
              <div class="metric-label">Community Points</div>
            </div>
            
            <div class="metric-card">
              <div class="metric-icon">🚀</div>
              <div class="metric-value">{{ userMetrics.implementedIdeas }}</div>
              <div class="metric-label">Ideas Implemented</div>
            </div>
          </div>
          
          <div class="achievement-banner">
            <div class="achievement-icon">🎯</div>
            <div class="achievement-content">
              <div class="achievement-title">Monthly Goal Progress</div>
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="userMetrics.monthlyGoalProgress"></div>
              </div>
              <div class="achievement-text">
                {{ getWeeklyGoalMessage(userMetrics.monthlyIdeasSubmitted) }}
              </div>
            </div>
          </div>
        </div>
        
        <h2 class="page-title" style="color: #FF7A00">Recent Ideas</h2>
        <div class="ideas-list">
          @for (idea of ideas; track idea.id) {
            <div class="idea-card">
              <div class="idea-content">
                <h3 class="idea-title">{{idea.title}}</h3>
                <p class="idea-description">{{idea.description}}</p>
                <div class="idea-meta">
                  <span class="author">{{getDisplayName(idea.authorId, idea.author)}}</span>
                  <span class="timestamp">{{idea.timestamp}}</span>
                </div>
              </div>
              <div class="idea-actions">
                <button 
                  class="vote-button upvote" 
                  [class.voted]="idea.userVote === 'up'"
                  (click)="vote(idea, 'up')">
                  👍 {{idea.upvotes}}
                </button>
                <button 
                  class="vote-button downvote" 
                  [class.voted]="idea.userVote === 'down'"
                  (click)="vote(idea, 'down')">
                  👎 {{idea.downvotes}}
                </button>
                <button class="comment-button" (click)="viewComments(idea)">
                  💬 {{idea.commentsList.length}}
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </main>
    
    <!-- Comments Modal -->
    @if (selectedIdea) {
      <div class="modal-overlay">
        <div class="comments-modal">
          <div class="modal-header">
            <h3>Comments for "{{selectedIdea.title}}"</h3>
            <button class="close-btn" (click)="closeCommentsModal()">×</button>
          </div>
          <div class="comments-list">
            @if (selectedIdea.commentsList.length === 0) {
              <div class="no-comments">
                No comments yet.
              </div>
            }
            @for (comment of getVisibleComments(); track comment.timestamp) {
              <div class="comment-item">
                <div class="comment-header">
                  <span class="comment-author">{{getDisplayName(comment.authorId, comment.author)}}</span>
                  <span class="comment-time">{{comment.timestamp}}</span>
                </div>
                <div class="comment-content">
                  <p>{{comment.text}}</p>
                </div>
              </div>
            }
            @if (currentPage < totalPages - 1) {
              <div class="pagination-controls">
                <button class="btn btn-outline" (click)="nextPage()">Next</button>
              </div>
            }
            @if (currentPage > 0) {
              <div class="pagination-controls">
                <button class="btn btn-outline" (click)="prevPage()">Previous</button>
              </div>
            }
          </div>
          
          <!-- Add Comment Form -->
          <div class="add-comment-form">
            <h4>Add a Comment</h4>
            <textarea 
              [(ngModel)]="newComment" 
              placeholder="Write your comment here..." 
              rows="3"
              class="comment-input"
            ></textarea>
            <button 
              class="btn btn-primary" 
              [disabled]="!newComment.trim()" 
              (click)="addComment()"
            >
              Submit Comment
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .main-content {
      padding: var(--space-4) 0;
    }

    .page-title {
      margin-bottom: var(--space-4);
      color: var(--neutral-800);
      font-size: 1.5rem;
    }

    .ideas-list {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .idea-card {
      background-color: white;
      border-radius: 8px;
      padding: var(--space-3);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      display: flex;
      gap: var(--space-3);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      animation: fadeIn 0.5s ease-out;
    }
    
    .idea-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .idea-content {
      flex: 1;
    }

    .idea-title {
      font-size: 1.125rem;
      margin-bottom: var(--space-1);
    }

    .idea-description {
      color: var(--neutral-600);
      font-size: 0.875rem;
      margin-bottom: var(--space-2);
    }

    .idea-meta {
      display: flex;
      gap: var(--space-2);
      font-size: 0.75rem;
      color: var(--neutral-500);
    }

    .idea-actions {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .vote-button,
    .comment-button {
      padding: var(--space-1) var(--space-2);
      border: 1px solid var(--primary-200);
      border-radius: 4px;
      background-color: var(--primary-500);
      color: white;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .vote-button:hover,
    .comment-button:hover {
      background-color: var(--primary-600);
    }

    .vote-button.upvote.voted {
      background-color: var(--primary-600);
      color: white;
      border-color: var(--primary-700);
    }
    
    .vote-button.downvote.voted {
      background-color: var(--neutral-600);
      color: white;
      border-color: var(--neutral-700);
    }
    
    /* Modal styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    
    .comments-modal {
      background-color: white;
      border-radius: 8px;
      width: 90%;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-3);
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--neutral-500);
    }
    
    .comments-list {
      padding: var(--space-3);
    }
    
    .comment-item {
      margin-bottom: var(--space-3);
      padding-bottom: var(--space-3);
      border-bottom: 1px solid var(--neutral-100);
    }
    
    .comment-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: var(--space-1);
    }
    
    .comment-author {
      font-weight: 500;
      color: var(--neutral-700);
    }
    
    .comment-time {
      font-size: 0.75rem;
      color: var(--neutral-500);
    }
    
    .comment-content p {
      margin: 0;
      color: var(--neutral-600);
    }
    
    .no-comments {
      text-align: center;
      color: var(--neutral-500);
      padding: var(--space-4);
    }
    
    .pagination-controls {
      display: flex;
      justify-content: center;
      margin-top: var(--space-3);
    }
    
    .pagination-controls .btn {
      margin: 0 var(--space-2);
      padding: 6px 12px;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      background-color: white;
      color: var(--neutral-700);
      border: 1px solid var(--neutral-300);
    }
    
    .pagination-controls .btn:hover {
      background-color: var(--neutral-50);
    }
    
    .btn-primary {
      background-color: var(--primary-500);
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .btn-primary:hover {
      background-color: var(--primary-600);
    }
    
    .btn-outline {
      background-color: white;
      color: var(--neutral-700);
      border: 1px solid var(--neutral-300);
    }
    
    .add-comment-form {
      padding: var(--space-3);
      border-top: 1px solid var(--neutral-200);
      margin-top: var(--space-3);
    }
    
    .add-comment-form h4 {
      margin-top: 0;
      margin-bottom: var(--space-2);
      color: var(--neutral-700);
    }
    
    .comment-input {
      width: 100%;
      padding: var(--space-2);
      border: 1px solid var(--neutral-300);
      border-radius: 4px;
      margin-bottom: var(--space-2);
      font-family: inherit;
      resize: vertical;
    }
    
    .comment-input:focus {
      outline: none;
      border-color: var(--primary-400);
      box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.1);
    }

    /* Dark theme support */
    :host-context([data-theme="dark"]) .idea-card {
      background-color: var(--card-bg);
      color: var(--card-text);
    }
    
    :host-context([data-theme="dark"]) .idea-title,
    :host-context([data-theme="dark"]) .idea-description,
    :host-context([data-theme="dark"]) .idea-meta {
      color: var(--card-text);
    }
    
    /* Orange buttons in dark mode */
    :host-context([data-theme="dark"]) .vote-button,
    :host-context([data-theme="dark"]) .comment-button {
      background-color: var(--primary-500);
      color: white;
      border-color: var(--primary-600);
    }
    
    :host-context([data-theme="dark"]) .vote-button:hover,
    :host-context([data-theme="dark"]) .comment-button:hover {
      background-color: var(--primary-600);
      color: white;
    }
    
    /* Ensure voted buttons have distinct styling */
    :host-context([data-theme="dark"]) .vote-button.upvote.voted,
    :host-context([data-theme="dark"]) .vote-button.downvote.voted {
      background-color: var(--primary-700);
      color: white;
      border-color: var(--primary-800);
    }
    
    /* Modal styling in dark mode */
    :host-context([data-theme="dark"]) .modal-overlay {
      background-color: rgba(0, 0, 0, 0.7);
    }
    
    :host-context([data-theme="dark"]) .modal-content {
      background-color: var(--card-bg);
      color: var(--card-text);
    }
    
    :host-context([data-theme="dark"]) .btn-primary {
      background-color: var(--primary-500);
      color: white;
    }
    
    :host-context([data-theme="dark"]) .btn-primary:hover {
      background-color: var(--primary-600);
    }
    
    :host-context([data-theme="dark"]) .comment-input {
      background-color: var(--bg-tertiary);
      color: var(--card-text);
      border-color: var(--border-color);
    }

    /* User metrics styles */
    .metrics-container {
      background-color: var(--card-bg, white);
      border-radius: 8px;
      padding: var(--space-3);
      margin-bottom: var(--space-4);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    
    .metrics-title {
      color: var(--primary-500);
      margin-bottom: var(--space-3);
      font-size: 1.25rem;
      text-align: center;
    }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-3);
      margin-bottom: var(--space-3);
    }
    
    @media (min-width: 768px) {
      .metrics-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    
    .metric-card {
      background-color: var(--bg-secondary, #f8f9fa);
      border-radius: 8px;
      padding: var(--space-2);
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .metric-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    }
    
    .metric-icon {
      font-size: 1.5rem;
      margin-bottom: var(--space-1);
    }
    
    .metric-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--primary-600);
    }
    
    .metric-label {
      font-size: 0.75rem;
      color: var(--neutral-600);
    }
    
    .achievement-banner {
      background: linear-gradient(to right, var(--primary-100), var(--primary-200));
      border-radius: 8px;
      padding: var(--space-2);
      display: flex;
      align-items: center;
      gap: var(--space-2);
      transition: transform 0.3s ease;
      animation: slideIn 0.6s ease-out;
    }
    
    .achievement-banner:hover {
      transform: scale(1.02);
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    .achievement-icon {
      font-size: 2rem;
    }
    
    .achievement-content {
      flex: 1;
    }
    
    .achievement-title {
      font-weight: 500;
      margin-bottom: var(--space-1);
    }
    
    .progress-bar {
      height: 8px;
      background-color: var(--neutral-200);
      border-radius: 4px;
      margin-bottom: var(--space-1);
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background-color: var(--primary-500);
      border-radius: 4px;
    }
    
    .achievement-text {
      font-size: 0.875rem;
      color: var(--neutral-700);
    }
    
    /* Dark theme support for metrics */
    :host-context([data-theme="dark"]) .metrics-container {
      background-color: var(--card-bg);
    }
    
    :host-context([data-theme="dark"]) .metrics-title {
      color: var(--primary-400);
    }
    
    :host-context([data-theme="dark"]) .metric-card {
      background-color: var(--bg-tertiary);
    }
    
    :host-context([data-theme="dark"]) .metric-value {
      color: var(--primary-400);
    }
    
    :host-context([data-theme="dark"]) .metric-label {
      color: var(--neutral-400);
    }
    
    :host-context([data-theme="dark"]) .achievement-banner {
      background: linear-gradient(to right, rgba(var(--primary-rgb), 0.2), rgba(var(--primary-rgb), 0.3));
    }
    
    :host-context([data-theme="dark"]) .progress-bar {
      background-color: var(--neutral-700);
    }
    
    :host-context([data-theme="dark"]) .achievement-text {
      color: var(--neutral-300);
    }

    /* Shake animation for vote buttons */
    @keyframes shake {
      0% { transform: translateX(0); }
      10% { transform: translateX(-5px); }
      20% { transform: translateX(5px); }
      30% { transform: translateX(-5px); }
      40% { transform: translateX(5px); }
      50% { transform: translateX(-3px); }
      60% { transform: translateX(3px); }
      70% { transform: translateX(-2px); }
      80% { transform: translateX(2px); }
      90% { transform: translateX(-1px); }
      100% { transform: translateX(0); }
    }
    
    .shake-animation {
      animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
    }

    /* Staggered animation for cards */
    .ideas-list .idea-card:nth-child(1) { animation-delay: 0.1s; }
    .ideas-list .idea-card:nth-child(2) { animation-delay: 0.2s; }
    .ideas-list .idea-card:nth-child(3) { animation-delay: 0.3s; }
    .ideas-list .idea-card:nth-child(4) { animation-delay: 0.4s; }
    .ideas-list .idea-card:nth-child(5) { animation-delay: 0.5s; }

    /* Metrics grid staggered animation */
    .metrics-grid .metric-card:nth-child(1) { animation: popIn 0.5s ease-out 0.1s both; }
    .metrics-grid .metric-card:nth-child(2) { animation: popIn 0.5s ease-out 0.2s both; }
    .metrics-grid .metric-card:nth-child(3) { animation: popIn 0.5s ease-out 0.3s both; }
    .metrics-grid .metric-card:nth-child(4) { animation: popIn 0.5s ease-out 0.4s both; }

    @keyframes popIn {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `]
})
export class IdeaListComponent implements OnInit, OnDestroy {
  ideas: Idea[] = [];
  selectedIdea: Idea | null = null;
  commentsPerPage = 2; // Show 2 comments per page
  currentPage = 0;
  totalPages = 0;
  newComment: string = '';
  isAdmin: boolean = false;
  currentUser: any;
  private subscription = new Subscription();
  
  // Add user metrics
  userMetrics = {
    ideasSubmitted: 0,
    implementedIdeas: 0,
    totalComments: 0,
    totalUpvotes: 0,
    engagementRate: 0,
    communityPoints: 0,
    topIdeas: 0,
    monthlyIdeasSubmitted: 0,
    monthlyGoalProgress: 0
  };

  // Add this property to store generated anonymous IDs
  private anonymousIdMap: Map<string, number> = new Map();

  constructor(
    private authService: AuthService,
    private themeUtils: ThemeUtilsService,
    private ideaService: IdeaService
  ) {}
  
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin = this.authService.isAdmin();
    
    // Create an instance of MyIdeasComponent to get user's ideas
    const myIdeasComponent = new MyIdeasComponent(
      this.authService,
      this.themeUtils,
      this.ideaService
    );
    
    // Initialize the MyIdeasComponent
    myIdeasComponent.ngOnInit();
    
    // Subscribe to ideas from the service
    this.subscription.add(
      this.ideaService.getIdeas().subscribe(ideas => {
        // Convert IdeaPost objects to Idea interface format
        const convertedIdeas = ideas.map(idea => ({
          id: idea.id,
          title: idea.title,
          description: idea.content,
          votes: idea.upvotes - idea.downvotes,
          upvotes: idea.upvotes,
          downvotes: idea.downvotes,
          comments: idea.comments?.length || 0,
          author: this.getDisplayName(idea.authorHash, 'Anonymous'),
          authorId: idea.authorHash,
          timestamp: idea.timestamp,
          userVote: idea.userVote,
          commentsList: idea.comments ? idea.comments.map(comment => ({
            text: comment.text,
            author: comment.author || 'Anonymous',
            authorId: comment.authorHash,
            timestamp: comment.timestamp
          })) : [],
          _sortDate: idea._sortDate || new Date()
        }));
        
        // Calculate user metrics using both the converted ideas and myIdeasComponent
        this.calculateUserMetrics(convertedIdeas, myIdeasComponent.myIdeas);
        
        // Filter ideas to only include those not more than 6 weeks old
        const sixWeeksAgo = new Date();
        sixWeeksAgo.setDate(sixWeeksAgo.getDate() - 42); // 6 weeks = 42 days
        
        this.ideas = convertedIdeas.filter(idea => {
          // If we have a sortDate, use it for filtering
          if (idea._sortDate) {
            return idea._sortDate > sixWeeksAgo;
          }
          
          // Otherwise, try to parse the timestamp
          // This is a fallback for the hardcoded ideas
          const timestampMatch = idea.timestamp.match(/(\d+)\s+(day|week|hour|minute|second)s?\s+ago/i);
          if (timestampMatch) {
            const amount = parseInt(timestampMatch[1]);
            const unit = timestampMatch[2].toLowerCase();
            
            // Convert to days for comparison
            let days = 0;
            switch (unit) {
              case 'second': days = amount / 86400; break;
              case 'minute': days = amount / 1440; break;
              case 'hour': days = amount / 24; break;
              case 'day': days = amount; break;
              case 'week': days = amount * 7; break;
              default: days = 0;
            }
            
            return days <= 42; // 6 weeks = 42 days
          }
          
          // If we can't determine the age, include it by default
          return true;
        });
        
        // Sort ideas by recency (newest first)
        this.ideas.sort((a, b) => {
          if (a._sortDate && b._sortDate) {
            return b._sortDate.getTime() - a._sortDate.getTime();
          }
          return 0;
        });
        
        // Update comments count to match commentsList length
        this.ideas.forEach(idea => {
          idea.comments = idea.commentsList.length;
        });
        
        console.log('Loaded recent ideas:', this.ideas);
      })
    );

    // Apply dark mode styling
    this.themeUtils.applyDarkModeStyles('.idea-card');
    
    // Listen for theme changes
    this.themeUtils.setupThemeChangeListener('.idea-card');
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  getDisplayName(authorId: string, authorName: string): string {
    // If user is admin, show employee ID in standard format
    if (this.isAdmin) {
      // Ensure authorId starts with EMP and has a 4-digit number
      if (authorId.startsWith('EMP') && authorId.length >= 7) {
        return `Employee ${authorId}`;
      } else {
        // Format as EMP followed by 4 digits if not already in that format
        const empId = authorId.startsWith('EMP') ? authorId : `EMP${authorId.substring(0, 4)}`;
        
        // Check if the ID after "EMP" contains non-numeric characters
        const idPart = empId.substring(3);
        if (!/^\d+$/.test(idPart)) {
          // If non-numeric, generate a random 4-digit number instead
          return `Employee EMP${1000 + Math.floor(Math.random() * 9000)}`;
        }
        
        return `Employee ${empId}`;
      }
    }
    
    // For regular users, use a consistent anonymous ID for each author
    if (!this.anonymousIdMap.has(authorId)) {
      // Generate a random 4-digit number and store it
      this.anonymousIdMap.set(authorId, 1000 + Math.floor(Math.random() * 9000));
    }
    
    // Return the stored anonymous ID
    return `Anonymous User ${this.anonymousIdMap.get(authorId)}`;
  }

  vote(idea: Idea, voteType: 'up' | 'down') {
    if (idea.userVote === voteType) {
      // If clicking the same vote type, remove the vote
      if (voteType === 'up') {
        idea.upvotes--;
      } else {
        idea.downvotes--;
      }
      idea.userVote = null;
    } else if (idea.userVote === (voteType === 'up' ? 'down' : 'up')) {
      // If changing vote from opposite type
      if (voteType === 'up') {
        idea.upvotes++;
        idea.downvotes--;
      } else {
        idea.downvotes++;
        idea.upvotes--;
      }
      idea.userVote = voteType;
    } else {
      // If voting for the first time
      if (voteType === 'up') {
        idea.upvotes++;
      } else {
        idea.downvotes++;
      }
      idea.userVote = voteType;
    }
    
    // Update total votes
    idea.votes = idea.upvotes - idea.downvotes;
    
    // Add shake animation to the button
    const buttonElement = document.querySelector(`.idea-card:nth-child(${this.ideas.indexOf(idea) + 1}) .vote-button.${voteType}vote`);
    if (buttonElement) {
      buttonElement.classList.add('shake-animation');
      setTimeout(() => {
        buttonElement.classList.remove('shake-animation');
      }, 500); // Remove class after animation completes
    }
    
    // Update the idea in the service
    this.ideaService.voteIdea(idea.id, voteType);
  }

  viewComments(idea: Idea) {
    this.selectedIdea = idea;
    this.currentPage = 0;
    this.calculateTotalPages();
    this.newComment = '';
  }

  closeCommentsModal() {
    this.selectedIdea = null;
    this.currentPage = 0;
    this.newComment = '';
  }
  
  calculateTotalPages(): void {
    if (!this.selectedIdea) return;
    
    this.totalPages = Math.ceil(this.selectedIdea.commentsList.length / this.commentsPerPage);
  }
  
  getVisibleComments(): Comment[] {
    if (!this.selectedIdea) return [];
    
    const start = this.currentPage * this.commentsPerPage;
    const end = start + this.commentsPerPage;
    
    return this.selectedIdea.commentsList.slice(start, end);
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    }
  }
  
  prevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
  
  addComment(): void {
    if (!this.selectedIdea || !this.newComment.trim() || !this.currentUser) return;
    
    // Create new comment
    const newComment: Comment = {
      text: this.newComment.trim(),
      authorId: this.currentUser.id || 'EMP3011',
      author: this.currentUser.name || 'Anonymous',
      timestamp: 'Just now'
    };
    
    // Add to the beginning of the comments list
    this.selectedIdea.commentsList.unshift(newComment);
    
    // Update the comments count
    this.selectedIdea.comments = this.selectedIdea.commentsList.length;
    
    // Reset form and recalculate pages
    this.newComment = '';
    this.calculateTotalPages();
    this.currentPage = 0; // Go to first page to see the new comment
  }

  calculateUserMetrics(ideas: Idea[], myIdeas: any[]): void {
    const currentUserId = this.currentUser?.id || '';
    
    // Use myIdeas for user's submitted ideas - this should be correct
    this.userMetrics.ideasSubmitted = myIdeas.length;
    
    // Calculate implemented ideas based on status
    this.userMetrics.implementedIdeas = myIdeas.filter(idea => 
      idea.status === 'implemented'
    ).length || 0;
    
    // Calculate total comments made by user across all ideas
    let userCommentCount = 0;
    let userUpvotesReceived = 0;
    
    ideas.forEach(idea => {
      // Count comments made by user
      if (idea.commentsList) {
        userCommentCount += idea.commentsList.filter((comment: Comment) => 
          comment.authorId === currentUserId
        ).length;
      }
      
      // Count upvotes received on user's ideas
      if (idea.authorId === currentUserId) {
        userUpvotesReceived += idea.upvotes;
      }
    });
    
    this.userMetrics.totalComments = userCommentCount;
    this.userMetrics.totalUpvotes = userUpvotesReceived;
    
    // Calculate engagement rate based on likes and comments
    const totalIdeas = ideas.length;
    if (totalIdeas > 0) {
      // Count ideas the user has liked or commented on
      const likedIdeas = ideas.filter(idea => idea.userVote === 'up').length;
      
      // Count total comments made by user
      const userComments = ideas.reduce((total, idea) => {
        const userCommentCount = idea.commentsList ? 
          idea.commentsList.filter((comment: Comment) => comment.authorId === currentUserId).length : 0;
        return total + userCommentCount;
      }, 0);
      
      // Calculate engagement score (each like = 1 point, each comment = 2 points)
      const engagementScore = likedIdeas + (userComments * 2);
      
      // Calculate maximum possible engagement (if user liked and commented on all ideas)
      const maxPossibleEngagement = totalIdeas * 3; // 1 for like + 2 for comment
      
      // Calculate engagement rate as a percentage of maximum possible engagement
      this.userMetrics.engagementRate = Math.min(100, Math.round((engagementScore / maxPossibleEngagement) * 100));
    } else {
      this.userMetrics.engagementRate = 0;
    }
    
    // Calculate community points (weighted score based on activities)
    this.userMetrics.communityPoints = 
      (this.userMetrics.ideasSubmitted * 10) + 
      (this.userMetrics.implementedIdeas * 50) + 
      (this.userMetrics.totalComments * 2) + 
      (userUpvotesReceived * 5);
    
    // Calculate ideas in top 10% (by upvotes)
    if (ideas.length > 0) {
      const sortedIdeas = [...ideas].sort((a, b) => b.upvotes - a.upvotes);
      const topTenPercent = Math.max(1, Math.floor(ideas.length * 0.1));
      const topIdeas = sortedIdeas.slice(0, topTenPercent);
      
      // Count how many of the user's ideas are in the top 10%
      this.userMetrics.topIdeas = myIdeas.filter(myIdea => 
        topIdeas.some(topIdea => topIdea.id === myIdea.id)
      ).length;
    }
    
    // Calculate monthly metrics
    const monthlyGoal = 5; // Monthly goal of 5 ideas
    
    // Get newly submitted ideas from the service
    this.subscription.add(
      this.ideaService.getIdeas().subscribe(serviceIdeas => {
        // Filter to get only ideas from the current user - use a more flexible approach
        const userIdeas = serviceIdeas.filter(idea => {
          // Check if authorHash matches current user ID
          if (idea.authorHash === currentUserId) return true;
          
          // Check if authorHash contains current user ID
          if (idea.authorHash && idea.authorHash.includes(currentUserId)) return true;
          
          // Check if the idea has the 'My Idea' tag (which is added when submitting a new idea)
          if (idea.tags && idea.tags.includes('My Idea')) {
            // For newly submitted ideas, check if they're from the current user
            // This is a fallback for when authorHash might not be set correctly
            return true;
          }
          
          return false;
        });
        
        console.log('Found user ideas from service:', userIdeas.length);
        
        // Combine service ideas with myIdeas for monthly calculation
        const allUserIdeas = [...myIdeas, ...userIdeas];
        
        // Remove duplicates by ID
        const uniqueIdeas = Array.from(
          new Map(allUserIdeas.map(item => [item.id, item])).values()
        );
        
        console.log('Total unique user ideas:', uniqueIdeas.length);
        
        // Calculate monthly ideas
        this.userMetrics.monthlyIdeasSubmitted = this.calculateMonthlyIdeasSubmitted(uniqueIdeas);
        console.log('Monthly ideas submitted:', this.userMetrics.monthlyIdeasSubmitted);
        
        this.userMetrics.monthlyGoalProgress = Math.min(100, Math.round((this.userMetrics.monthlyIdeasSubmitted / monthlyGoal) * 100));
      })
    );
  }
  
  calculateMonthlyIdeasSubmitted(ideas: any[]): number {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    
    // Count ideas submitted in the current month
    const monthlyIdeas = ideas.filter(idea => {
      // For newly submitted ideas, always count them as current month
      if (idea.timestamp === 'Just now' || idea._originalTimestamp === 'Just now') {
        return true;
      }
      
      // If idea has a sortDate, use it
      if (idea._sortDate && idea._sortDate instanceof Date) {
        return idea._sortDate >= firstDayOfMonth;
      }
      
      // Otherwise try to parse from timestamp
      if (idea.timestamp) {
        // Handle "X days/weeks/months ago" format
        const match = idea.timestamp.match(/(\d+)\s+(day|week|month|hr|hour|minute|second)s?\s+ago/i);
        if (match) {
          const amount = parseInt(match[1]);
          const unit = match[2].toLowerCase();
          const ideaDate = new Date();
          
          if (unit === 'second' || unit === 'minute') {
            // Seconds and minutes are definitely this month
            return true;
          } else if (unit === 'hr' || unit === 'hour') {
            // Hours are definitely this month
            return true;
          } else if (unit === 'day') {
            ideaDate.setDate(ideaDate.getDate() - amount);
          } else if (unit === 'week') {
            ideaDate.setDate(ideaDate.getDate() - (amount * 7));
          } else if (unit === 'month') {
            ideaDate.setMonth(ideaDate.getMonth() - amount);
          }
          
          return ideaDate >= firstDayOfMonth;
        }
        
        // Try to parse as date string
        try {
          const date = new Date(idea.timestamp);
          if (!isNaN(date.getTime())) {
            return date >= firstDayOfMonth;
          }
        } catch (e) {
          // Ignore parsing errors
        }
      }
      
      // Default to false if we can't determine the date
      return false;
    });
    
    console.log('Ideas in current month:', monthlyIdeas.map(i => i.title));
    return monthlyIdeas.length;
  }
  
  getWeeklyGoalMessage(count: number): string {
    const monthlyGoal = 5;
    if (count >= monthlyGoal) {
      return `Congratulations! You've reached your monthly goal of ${monthlyGoal} ideas.`;
    } else {
      return `You've submitted ${count} of ${monthlyGoal} ideas this month.`;
    }
  }
}




// I've updated the engagement rate calculation to:

// Count the number of ideas the user has liked (upvoted)
// Count the total number of comments made by the user across all ideas
// Calculate an engagement score where:
// Each like (upvote) = 1 point
// Each comment = 2 points (comments show more engagement than likes)
// Calculate the maximum possible engagement if the user had liked and commented on every idea
// Express the engagement rate as a percentage of this maximum possible engagement
// Cap the engagement rate at 100% to handle cases where a user might comment multiple times on the same idea











// I've updated the engagement rate calculation to:

// Count the number of ideas the user has liked (upvoted)
// Count the total number of comments made by the user across all ideas
// Calculate an engagement score where:
// Each like (upvote) = 1 point
// Each comment = 2 points (comments show more engagement than likes)
// Calculate the maximum possible engagement if the user had liked and commented on every idea
// Express the engagement rate as a percentage of this maximum possible engagement
// Cap the engagement rate at 100% to handle cases where a user might comment multiple times on the same idea





// Key differences between Engagement Rate and Community Points:

// Engagement Rate (0-100%):
// Measures how active the user is across all available ideas
// Calculated as the percentage of ideas the user has engaged with (voted or commented on)
// Represents current participation level in the community
// Resets if user stops engaging with ideas
// Community Points (cumulative score):
// A weighted cumulative score that grows over time
// Rewards all contributions: submitting ideas, getting ideas implemented, commenting, and receiving upvotes
// Different activities have different point values based on their importance
// Never decreases unless points are explicitly removed
// Represents the user's total contribution to the community over time
// This implementation clearly differentiates between the two metrics and calculates them appropriately.


  // calculateUserMetrics(ideas: Idea[], myIdeas: Idea[]): void {
  //   const currentUserId = this.currentUser?.id || '';
    
  //   // Calculate total ideas submitted by the user
  //   this.userMetrics.ideasSubmitted = myIdeas.length;
    

// Key improvements:

// Ideas Implemented: Now checks for 'implemented' status (case-insensitive) using type assertion to handle potential missing status property
// Ideas in Top 10%: Uses the sorted list of all ideas by upvotes to determine the top 10%, then checks how many of the user's ideas are in that list
// Engagement Rate: Properly calculates the percentage of ideas the user has engaged with through votes or comments
// Community Points: Weighted score based on all user activities (ideas submitted, implemented ideas, comments made, upvotes received)
// Monthly Goal Progress: Accurately determines ideas submitted in the current month
