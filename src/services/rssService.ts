// RSS Feed Service for fetching and parsing health news
import { Article } from '@/types';

interface RSSItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source?: string;
}

interface RSSFeed {
  title: string;
  description: string;
  items: RSSItem[];
}

class RSSService {
  private readonly corsProxy = 'https://api.allorigins.win/raw?url=';
  
  async fetchRSSFeed(feedUrl: string): Promise<Article[]> {
    try {
      console.log('Fetching RSS feed:', feedUrl);
      
      // Try multiple CORS proxies for better reliability
      const proxies = [
        'https://api.allorigins.win/raw?url=',
        'https://corsproxy.io/?',
        'https://api.codetabs.com/v1/proxy?quest='
      ];
      
      let articles: Article[] = [];
      let lastError: Error | null = null;
      
      for (const proxy of proxies) {
        try {
          const proxyUrl = `${proxy}${encodeURIComponent(feedUrl)}`;
          console.log('Trying proxy:', proxy);
          
          const response = await fetch(proxyUrl, {
            headers: {
              'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml, */*'
            }
          });
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          const xmlText = await response.text();
          console.log('Received XML length:', xmlText.length);
          
          if (!xmlText || xmlText.length < 50) {
            throw new Error('Empty or invalid response');
          }
          
          articles = this.parseRSSXML(xmlText, feedUrl);
          
          if (articles.length > 0) {
            console.log('Successfully parsed articles:', articles.length);
            return articles;
          } else {
            throw new Error('No articles found in feed');
          }
        } catch (error) {
          console.warn(`Proxy ${proxy} failed:`, error);
          lastError = error as Error;
          continue;
        }
      }
      
      // If all proxies failed, throw the last error
      throw lastError || new Error('All proxy attempts failed');
      
    } catch (error) {
      console.error('Error fetching RSS feed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      if (errorMessage.includes('CORS') || errorMessage.includes('blocked')) {
        throw new Error('CORS error: Unable to access the RSS feed. The feed may not allow cross-origin requests.');
      } else if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
        throw new Error('RSS feed not found. Please check the URL and try again.');
      } else if (errorMessage.includes('timeout')) {
        throw new Error('Request timeout. The RSS feed is taking too long to respond.');
      } else {
        throw new Error(`Failed to fetch RSS feed: ${errorMessage}`);
      }
    }
  }
  
  private parseRSSXML(xmlText: string, feedUrl: string): Article[] {
    try {
      console.log('Parsing XML, first 500 chars:', xmlText.substring(0, 500));
      
      // Clean up the XML text
      const cleanXml = xmlText
        .replace(/^\s*[\r\n]/gm, '') // Remove empty lines
        .replace(/&(?!(?:apos|quot|[gl]t|amp);|#)/g, '&amp;') // Escape unescaped ampersands
        .trim();
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(cleanXml, 'application/xml');
      
      // Check for parsing errors
      const parseError = xmlDoc.querySelector('parsererror');
      if (parseError) {
        console.error('XML Parse Error:', parseError.textContent);
        throw new Error('Invalid XML format');
      }
      
      // Try different RSS/Atom formats
      let items = xmlDoc.querySelectorAll('item'); // RSS 2.0
      if (items.length === 0) {
        items = xmlDoc.querySelectorAll('entry'); // Atom
      }
      if (items.length === 0) {
        items = xmlDoc.querySelectorAll('rss > channel > item'); // More specific RSS
      }
      
      console.log('Found items:', items.length);
      
      if (items.length === 0) {
        // Log the structure for debugging
        console.log('XML root element:', xmlDoc.documentElement?.tagName);
        console.log('Available elements:', Array.from(xmlDoc.querySelectorAll('*')).map(el => el.tagName).slice(0, 10));
        throw new Error('No RSS items found in feed');
      }
      
      const articles: Article[] = [];
      
      items.forEach((item, index) => {
        if (index >= 10) return; // Limit to 10 articles
        
        // Handle both RSS and Atom formats
        const title = this.getTextContent(item, 'title');
        let description = this.getTextContent(item, 'description') || 
                         this.getTextContent(item, 'summary') ||
                         this.getTextContent(item, 'content');
        
        // Get link for both RSS and Atom
        let link = this.getTextContent(item, 'link');
        if (!link) {
          const linkElement = item.querySelector('link[href]');
          link = linkElement?.getAttribute('href') || '';
        }
        
        // Get publication date
        const pubDate = this.getTextContent(item, 'pubDate') || 
                       this.getTextContent(item, 'published') ||
                       this.getTextContent(item, 'updated');
        
        // Ensure we have minimum required content
        if (!title) {
          console.warn('Skipping item without title:', index);
          return;
        }
        
        if (!description) {
          description = title; // Use title as fallback content
        }
        
        try {
          const article: Article = {
            id: `rss-${Date.now()}-${index}`,
            title: this.cleanText(title),
            content: this.cleanText(description),
            url: link || feedUrl,
            publishedAt: this.parseDate(pubDate),
            source: this.extractSourceFromUrl(feedUrl),
            category: 'Public Health',
          };
          
          articles.push(article);
          console.log(`Added article ${index + 1}:`, article.title.substring(0, 50));
        } catch (error) {
          console.warn(`Error creating article ${index}:`, error);
        }
      });
      
      if (articles.length === 0) {
        throw new Error('No valid articles could be extracted from the RSS feed');
      }
      
      console.log(`Successfully parsed ${articles.length} articles`);
      return articles;
      
    } catch (error) {
      console.error('Error parsing RSS XML:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown parsing error';
      throw new Error(`Failed to parse RSS feed: ${errorMessage}`);
    }
  }
  
  private getTextContent(element: Element, tagName: string): string {
    const tag = element.querySelector(tagName);
    return tag?.textContent?.trim() || '';
  }
  
  private cleanText(text: string): string {
    if (!text) return '';
    
    try {
      // Remove HTML tags and decode entities
      const div = document.createElement('div');
      div.innerHTML = text;
      let cleanText = div.textContent || div.innerText || '';
      
      // Remove extra whitespace and line breaks
      cleanText = cleanText
        .replace(/\s+/g, ' ')
        .replace(/\n\s*\n/g, '\n')
        .trim();
      
      return cleanText;
    } catch (error) {
      console.warn('Error cleaning text:', error);
      return text.replace(/<[^>]*>/g, '').trim(); // Fallback: simple HTML tag removal
    }
  }
  
  private parseDate(dateString: string): Date {
    if (!dateString) return new Date();
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return new Date(); // Return current date if parsing fails
      }
      return date;
    } catch (error) {
      console.warn('Error parsing date:', dateString, error);
      return new Date();
    }
  }
  
  private extractSourceFromUrl(url: string): string {
    try {
      const domain = new URL(url).hostname;
      // Remove www. and extract main domain
      return domain.replace('www.', '').split('.')[0];
    } catch {
      return 'RSS Feed';
    }
  }
  
  // Validate RSS URL format
  isValidRSSUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }
  
  // Popular health RSS feeds for suggestions
  getPopularHealthFeeds(): { name: string; url: string; description: string }[] {
    return [
      {
        name: 'ScienceDaily Health',
        url: 'https://www.sciencedaily.com/rss/health_medicine.xml',
        description: 'Latest health and medicine research'
      },
      {
        name: 'Reuters Health',
        url: 'https://www.reuters.com/arc/outboundfeeds/rss/category/health/?outputType=xml',
        description: 'Global health news and medical research'
      }
    ];
  }
}

export const rssService = new RSSService();
export default rssService;
