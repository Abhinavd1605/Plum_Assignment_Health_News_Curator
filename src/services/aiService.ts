// Groq AI Service for Health News Processing
import Groq from 'groq-sdk';
import { Article, Summary, Takeaway, AIRequest, AIResponse } from '@/types';

class GroqAIService {
  private groq: Groq;
  private readonly maxRetries = 3;
  private readonly baseDelay = 1000;

  constructor() {
    // Get API key from environment variables
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    
    this.groq = new Groq({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Only for demo - never in production
    });
  }

  // Check if API is available
  private isApiAvailable(): boolean {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    return !!(apiKey);
  }

  // Generate 2-line TL;DR summaries
  async generateSummary(article: Article): Promise<Summary> {
    const startTime = Date.now();
    
    // If no API key, return demo fallback immediately
    if (!this.isApiAvailable()) {
      console.warn('No Groq API key found. Using demo mode with fallback summaries.');
      return {
        tldr: [
          'Health research continues to advance medical understanding.',
          'This development may impact patient care and treatment options.'
        ],
        confidence: 0.5,
        processingTime: Date.now() - startTime,
        createdAt: new Date()
      };
    }
    
    try {
      const prompt = `
        As a medical news expert, create a concise 2-line summary of this health article.
        
        Article Title: ${article.title}
        Content: ${article.content}
        
        Requirements:
        - Exactly 2 sentences
        - First line: Main finding or development
        - Second line: Why it matters or impact
        - Use simple, clear language
        - Avoid medical jargon
        - Keep each line under 80 characters
        
        Format your response as JSON:
        {
          "line1": "First summary line",
          "line2": "Second summary line",
          "confidence": 0.95
        }
      `;

      const completion = await this.groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gemma2-9b-it',
        temperature: 0.3,
        max_tokens: 200,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) throw new Error('No response from AI');

      const parsed = JSON.parse(response);
      const processingTime = Date.now() - startTime;

      return {
        tldr: [parsed.line1, parsed.line2],
        confidence: parsed.confidence || 0.8,
        processingTime,
        createdAt: new Date()
      };
    } catch (error) {
      console.error('Error generating summary:', error);
      // Fallback summary for demo
      return {
        tldr: [
          'Health research continues to advance medical understanding.',
          'This development may impact patient care and treatment options.'
        ],
        confidence: 0.5,
        processingTime: Date.now() - startTime,
        createdAt: new Date()
      };
    }
  }

  // Extract 3 key medical takeaways
  async extractTakeaways(article: Article): Promise<Takeaway[]> {
    // If no API key, return demo fallback immediately
    if (!this.isApiAvailable()) {
      return [
        {
          point: 'New research provides insights into health and wellness',
          importance: 'high' as const,
          category: 'Research',
          explanation: 'Understanding these findings can help inform healthcare decisions'
        },
        {
          point: 'Medical professionals recommend staying informed about developments',
          importance: 'medium' as const,
          category: 'Professional Advice',
          explanation: 'Staying current with medical news helps patients make informed choices'
        },
        {
          point: 'Further research may be needed to confirm these findings',
          importance: 'medium' as const,
          category: 'Research Status',
          explanation: 'Medical research is ongoing and findings continue to evolve'
        }
      ];
    }
    
    try {
      const prompt = `
        Extract exactly 3 key medical takeaways from this health article.
        
        Article: ${article.title}
        Content: ${article.content}
        
        Requirements:
        - Identify the 3 most important medical insights
        - Rate importance: high, medium, or low
        - Categorize each takeaway
        - Use patient-friendly language
        - Focus on practical implications
        
        Format as JSON array:
        [
          {
            "point": "Clear, actionable takeaway",
            "importance": "high",
            "category": "Treatment",
            "explanation": "Brief explanation why this matters"
          }
        ]
      `;

      const completion = await this.groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gemma2-9b-it',
        temperature: 0.4,
        max_tokens: 400,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) throw new Error('No response from AI');

      return JSON.parse(response);
    } catch (error) {
      console.error('Error extracting takeaways:', error);
      // Fallback takeaways for demo
      return [
        {
          point: 'New research provides insights into health and wellness',
          importance: 'high' as const,
          category: 'Research',
          explanation: 'Understanding these findings can help inform healthcare decisions'
        },
        {
          point: 'Medical professionals recommend staying informed about developments',
          importance: 'medium' as const,
          category: 'Professional Advice',
          explanation: 'Staying current with medical news helps patients make informed choices'
        },
        {
          point: 'Further research may be needed to confirm these findings',
          importance: 'medium' as const,
          category: 'Research Status',
          explanation: 'Medical research is ongoing and findings continue to evolve'
        }
      ];
    }
  }

  // Rewrite in simple, friendly language
  async simplifyArticle(article: Article): Promise<string> {
    // If no API key, return original content
    if (!this.isApiAvailable()) {
      return article.content;
    }
    
    try {
      const prompt = `
        Rewrite this medical article in simple, friendly language that anyone can understand.
        
        Original Article:
        Title: ${article.title}
        Content: ${article.content}
        
        Requirements:
        - Use everyday language, avoid medical jargon
        - Maintain scientific accuracy
        - Make it engaging and easy to read
        - Include why this matters to regular people
        - Keep the same key information but make it accessible
        - Use short paragraphs and clear explanations
        - Add context where needed
        
        Write a complete, simplified article:
      `;

      const completion = await this.groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gemma2-9b-it',
        temperature: 0.5,
        max_tokens: 1000,
      });

      const response = completion.choices[0]?.message?.content;
      return response || article.content;
    } catch (error) {
      console.error('Error simplifying article:', error);
      return article.content; // Return original if simplification fails
    }
  }

  // Handle rate limits and errors gracefully
  async processWithRetry<T>(
    operation: () => Promise<T>,
    retryCount: number = 0
  ): Promise<T> {
    try {
      return await operation();
    } catch (error: any) {
      if (retryCount < this.maxRetries && this.shouldRetry(error)) {
        const delay = this.baseDelay * Math.pow(2, retryCount);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.processWithRetry(operation, retryCount + 1);
      }
      throw error;
    }
  }

  private shouldRetry(error: any): boolean {
    // Retry on rate limits, network errors, or temporary failures
    const retryableErrors = [
      'rate_limit_exceeded',
      'network_error',
      'timeout',
      'service_unavailable'
    ];
    
    return retryableErrors.some(errorType => 
      error.message?.toLowerCase().includes(errorType) ||
      error.code?.toLowerCase().includes(errorType)
    );
  }

  // Process complete article with all AI features
  async processArticle(article: Article): Promise<Article> {
    const startTime = Date.now();
    console.log(`Processing article: ${article.title}`);

    try {
      // Process summary, takeaways, and simplification in parallel for efficiency
      const [summary, takeaways, simplifiedContent] = await Promise.all([
        this.processWithRetry(() => this.generateSummary(article)),
        this.processWithRetry(() => this.extractTakeaways(article)),
        this.processWithRetry(() => this.simplifyArticle(article))
      ]);

      const processingTime = Date.now() - startTime;
      console.log(`Article processed in ${processingTime}ms`);

      return {
        ...article,
        summary,
        takeaways,
        simplifiedContent,
        isProcessing: false
      };
    } catch (error) {
      console.error('Error processing article:', error);
      return {
        ...article,
        isProcessing: false
      };
    }
  }
}

// Export singleton instance
export const aiService = new GroqAIService();
export default aiService;
