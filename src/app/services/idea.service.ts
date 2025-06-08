import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface IdeaPost {
  _originalTimestamp: string;
  _sortDate: Date;
  id: number;
  title: string;
  content: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  userVote: 'up' | 'down' | null;
  tags: string[];
  authorHash: string;
  status?: string;
  attachments?: {
    name: string;
    size: number;
    type: string;
  }[];
  comments?: Comment[];
  resources?: string;
  impact?: string;
  category?: string; // Add category field
}

export interface Comment {
  text: string;
  author: string;
  authorHash: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  private ideasSubject = new BehaviorSubject<IdeaPost[]>([
    // Original ideas with proper dates
    {
      id: 1,
      title: "Organize relevant Staff Training",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      timestamp: "2 hr ago",
      _originalTimestamp: "2 hr ago",
      _sortDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      upvotes: 24,
      downvotes: 3,
      userVote: null,
      tags: ["Staff Training", "HR"],
      authorHash: "EMP3008",
      status: "pending"
    },
    {
      id: 2,
      title: "Give us better food",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      timestamp: "3 hr ago",
      _originalTimestamp: "3 hr ago",
      _sortDate: new Date(Date.now() - 3 * 60 * 60 * 1000),
      upvotes: 42,
      downvotes: 5,
      userVote: null,
      tags: ["Staff Well-being", "Cafeteria"],
      authorHash: "EMP4001",
      status: "approved"
    },
    {
      id: 3,
      title: "Create a marketplace app for staff",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      timestamp: "5 hr ago",
      _originalTimestamp: "5 hr ago",
      _sortDate: new Date(Date.now() - 5 * 60 * 60 * 1000),
      upvotes: 31,
      downvotes: 2,
      userVote: null,
      tags: ["Staff Marketplace", "App Development"],
      authorHash: "EMP5002",
      status: "pending"
    },
    {
      id: 4,
      title: "Buy Favour's Cake!",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      timestamp: "6 hr ago",
      _originalTimestamp: "6 hr ago",
      _sortDate: new Date(Date.now() - 6 * 60 * 60 * 1000),
      upvotes: 18,
      downvotes: 1,
      userVote: null,
      tags: ["Staff Celebration", "Birthday"],
      authorHash: "EMP4300",
      status: "rejected"
    },
    
    // Popular ideas
    {
      id: 101,
      title: "AI-Powered Customer Service Chatbot",
      content: "Implement an advanced AI chatbot to handle routine customer inquiries and provide 24/7 support.",
      timestamp: "2 days ago",
      _originalTimestamp: "2 days ago",
      _sortDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      upvotes: 156,
      downvotes: 10,
      userVote: null,
      tags: ["Popular", "AI", "Customer Service"],
      authorHash: "EMP2001",
      status: "pending",
      comments: [
        { text: "Great idea! I love AI chatbots.", author: "User1", authorHash: "EMP2002", timestamp: "2 days ago" },
        { text: "This could be really helpful for customer support.", author: "User2", authorHash: "EMP2003", timestamp: "1 day ago" }
      ]
    },
    
    // My ideas
    {
      id: 201,
      title: "Mobile Branch Banking App",
      content: "A mobile app that brings all branch services to customers' phones, reducing wait times and improving service delivery.",
      timestamp: "2 months ago",
      _originalTimestamp: "2 months ago",
      _sortDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      upvotes: 89,
      downvotes: 0,
      userVote: null,
      tags: ["My Idea", "Mobile", "Banking"],
      authorHash: "EMP1001",
      status: "implemented",
      comments: [
        { text: "Great idea! This will really help our customers.", author: "Jane Smith", authorHash: "EMP1002", timestamp: "1 month ago" },
        { text: "We should prioritize this for Q3.", author: "John Doe", authorHash: "EMP1003", timestamp: "3 weeks ago" },
        { text: "The tech team is already working on this.", author: "Tech Lead", authorHash: "EMP1004", timestamp: "2 weeks ago" }
      ]
    },
    {
      id: 202,
      title: "Smart Queue Management System",
      content: "Using IoT sensors and mobile app integration to manage branch queues efficiently and reduce wait times.",
      timestamp: "1 month ago",
      _originalTimestamp: "1 month ago",
      _sortDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      upvotes: 45,
      downvotes: 0,
      userVote: null,
      tags: ["My Idea", "IoT", "Queue Management"],
      authorHash: "EMP1003",
      status: "approved",
      comments: [
        { text: "This is a great solution! I've seen similar systems in other banks.", author: "Alice Johnson", authorHash: "EMP1005", timestamp: "2 weeks ago" },
        { text: "I'm excited to see this in action! Let's get it started.", author: "Bob Brown", authorHash: "EMP1006", timestamp: "1 week ago" }
      ]
    },
    
    // Admin ideas
    {
      id: 301,
      title: "Automated Compliance Reporting",
      content: "Create an automated system for generating compliance reports to reduce manual work and ensure accuracy.",
      timestamp: "3 months ago",
      _originalTimestamp: "3 months ago",
      _sortDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
      upvotes: 42,
      downvotes: 3,
      userVote: null,
      tags: ["Admin", "Compliance", "Automation"],
      authorHash: "ADMIN001",
      status: "implemented",
      comments: [
        { text: "This will save us hours of work each month!", author: "Jane Smith", authorHash: "EMP1002", timestamp: "2 months ago" },
        { text: "Can we prioritize this for Q2?", author: "John Doe", authorHash: "EMP1003", timestamp: "2 months ago" },
        { text: "Implementation has begun, expected completion next month.", author: "Admin User", authorHash: "ADMIN001", timestamp: "1 month ago" }
      ]
    },
    
    // Idea list ideas
    {
      id: 401,
      title: "Digital Branch Transformation",
      content: "Redesign branch layout with digital-first approach, including self-service kiosks and video banking stations.",
      timestamp: "3 days ago",
      _originalTimestamp: "3 days ago",
      _sortDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      upvotes: 45,
      downvotes: 0,
      userVote: null,
      tags: ["Branch", "Innovation", "Digital"],
      authorHash: "EMP3001",
      status: "pending",
      comments: [
        { text: "This would greatly improve customer experience!", author: "Branch Manager", authorHash: "EMP3002", timestamp: "2 days ago" },
        { text: "We should pilot this in our downtown location first.", author: "Regional Director", authorHash: "EMP3003", timestamp: "1 day ago" },
        { text: "I've seen similar implementations at competitor banks.", author: "Market Analyst", authorHash: "EMP3004", timestamp: "12 hours ago" }
      ]
    },
    {
      id: 402,
      title: "Branch Staff Mobile App",
      content: "Create a mobile app for branch staff to access customer information, process transactions, and provide service anywhere in the branch.",
      timestamp: "5 days ago",
      _originalTimestamp: "5 days ago",
      _sortDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      upvotes: 38,
      downvotes: 0,
      userVote: null,
      tags: ["Mobile", "Staff", "Technology"],
      authorHash: "EMP3005",
      status: "pending",
      comments: [
        { text: "This would eliminate the need for fixed teller stations!", author: "Operations Manager", authorHash: "EMP3006", timestamp: "4 days ago" },
        { text: "We need to ensure strong security measures for this.", author: "IT Security", authorHash: "EMP3007", timestamp: "3 days ago" }
      ]
    }
  ]);

  ideas$ = this.ideasSubject.asObservable();

  constructor() {}

  getIdeas() {
    return this.ideas$;
  }

  addIdea(idea: IdeaPost) {
    // Ensure idea has all required properties
    const newIdea = {
      ...idea,
      timestamp: 'Just now',
      _originalTimestamp: 'Just now',
      _sortDate: new Date(), // Add current date for sorting and filtering
      upvotes: idea.upvotes || 0,
      downvotes: idea.downvotes || 0,
      userVote: idea.userVote || null,
      tags: idea.tags || []
    };
    
    // Log the idea being added
    console.log('Adding idea to service:', newIdea);
    
    const currentIdeas = this.ideasSubject.value;
    this.ideasSubject.next([newIdea, ...currentIdeas]);
  }

  updateIdea(updatedIdea: IdeaPost) {
    const currentIdeas = this.ideasSubject.value;
    const index = currentIdeas.findIndex(idea => idea.id === updatedIdea.id);
    
    if (index !== -1) {
      const newIdeas = [...currentIdeas];
      newIdeas[index] = updatedIdea;
      this.ideasSubject.next(newIdeas);
    }
  }

  voteIdea(ideaId: number, voteType: 'up' | 'down') {
    const currentIdeas = this.ideasSubject.value;
    const index = currentIdeas.findIndex(idea => idea.id === ideaId);
    
    if (index !== -1) {
      const idea = {...currentIdeas[index]};
      
      // If already voted the same way, remove vote
      if (idea.userVote === voteType) {
        if (voteType === 'up') {
          idea.upvotes--;
        } else {
          idea.downvotes--;
        }
        idea.userVote = null;
      } 
      // If voted the opposite way, switch vote
      else if (idea.userVote !== null) {
        if (voteType === 'up') {
          idea.upvotes++;
          idea.downvotes--;
        } else {
          idea.downvotes++;
          idea.upvotes--;
        }
        idea.userVote = voteType;
      } 
      // If not voted yet, add new vote
      else {
        if (voteType === 'up') {
          idea.upvotes++;
        } else {
          idea.downvotes++;
        }
        idea.userVote = voteType;
      }
      
      const newIdeas = [...currentIdeas];
      newIdeas[index] = idea;
      this.ideasSubject.next(newIdeas);
    }
  }

  getIdeaById(id: number): IdeaPost | undefined {
    return this.ideasSubject.value.find(idea => idea.id === id);
  }

  deleteIdea(id: number): boolean {
    const currentIdeas = this.ideasSubject.value;
    const index = currentIdeas.findIndex(idea => idea.id === id);
    
    if (index !== -1) {
      const newIdeas = [...currentIdeas];
      newIdeas.splice(index, 1);
      this.ideasSubject.next(newIdeas);
      return true;
    }
    return false;
  }
}








