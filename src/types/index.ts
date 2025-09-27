// Core data types for the Health News Curator

export interface Article {
  id: string;
  title: string;
  content: string;
  source: string;
  publishedAt: Date;
  category: HealthCategory;
  url?: string;
  imageUrl?: string;
  summary?: Summary;
  takeaways?: Takeaway[];
  simplifiedContent?: string;
  isProcessing?: boolean;
}

export interface Summary {
  tldr: [string, string]; // Exactly 2 lines
  confidence: number;
  processingTime: number;
  createdAt: Date;
}

export interface Takeaway {
  point: string;
  importance: 'high' | 'medium' | 'low';
  category: string;
  explanation?: string;
}

export type HealthCategory = 
  | 'Medical Breakthroughs'
  | 'Public Health'
  | 'Treatment Advances'
  | 'Prevention Tips'
  | 'Mental Health'
  | 'Nutrition Research'
  | 'Healthcare Technology'
  | 'Drug Development'
  | 'Clinical Trials'
  | 'Wellness';

export interface AIRequest {
  type: 'summary' | 'takeaways' | 'simplify';
  article: Article;
  retryCount?: number;
}

export interface AIResponse {
  success: boolean;
  data?: any;
  error?: string;
  processingTime: number;
}

export interface ProcessingState {
  isLoading: boolean;
  currentStep: string;
  progress: number;
  articlesProcessed: number;
  totalArticles: number;
}

export interface NewsFilter {
  category?: HealthCategory;
  dateRange?: {
    start: Date;
    end: Date;
  };
  searchTerm?: string;
}

export interface UserPreferences {
  preferredCategories: HealthCategory[];
  readingLevel: 'basic' | 'intermediate' | 'advanced';
  notificationSettings: {
    breakingNews: boolean;
    dailyDigest: boolean;
    categoryAlerts: HealthCategory[];
  };
}