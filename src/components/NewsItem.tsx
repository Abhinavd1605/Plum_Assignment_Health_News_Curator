// Individual news article card component
import React from 'react';
import { Article } from '@/types';
import { GlassCard } from './GlassCard';
import { LoadingSpinner } from './LoadingSpinner';
import { cn } from '@/lib/utils';
import { Calendar, ExternalLink, Brain, Clock } from 'lucide-react';

interface NewsItemProps {
  article: Article;
  onSelect: (article: Article) => void;
  variant?: 'compact' | 'full' | 'summary';
}

export const NewsItem: React.FC<NewsItemProps> = ({
  article,
  onSelect,
  variant = 'full'
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Medical Breakthroughs': 'bg-primary/10 text-primary border-primary/20',
      'Mental Health': 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
      'Healthcare Technology': 'bg-purple-500/10 text-purple-600 border-purple-500/20',
      'Nutrition Research': 'bg-orange-500/10 text-orange-600 border-orange-500/20',
      'Treatment Advances': 'bg-blue-500/10 text-blue-600 border-blue-500/20',
      'Prevention Tips': 'bg-green-500/10 text-green-600 border-green-500/20'
    };
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground border-muted';
  };

  if (variant === 'compact') {
    return (
      <GlassCard 
        variant="interactive" 
        className="p-4 hover:bg-card-hover"
        onClick={() => onSelect(article)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm line-clamp-2 !text-black dark:!text-white mb-2">
              {article.title}
            </h3>
            <div className="flex items-center gap-3 text-xs !text-gray-600 dark:!text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.source}
              </span>
            </div>
          </div>
          {article.isProcessing && (
            <LoadingSpinner size="sm" variant="pulse" className="ml-2" />
          )}
        </div>
      </GlassCard>
    );
  }

  if (variant === 'summary' && article.summary) {
    return (
      <GlassCard 
        variant="interactive" 
        className="hover:bg-card-hover"
        onClick={() => onSelect(article)}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg line-clamp-2 !text-black dark:!text-white flex-1">
              {article.title}
            </h3>
            <div className={cn(
              'px-2 py-1 rounded-full text-xs font-medium border ml-4 flex-shrink-0',
              getCategoryColor(article.category)
            )}>
              {article.category}
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI Summary</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm !text-black dark:!text-white">{article.summary.tldr[0]}</p>
              <p className="text-sm !text-black dark:!text-white">{article.summary.tldr[1]}</p>
            </div>
          </div>

          {article.takeaways && article.takeaways.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium !text-black dark:!text-white">Key Takeaways:</h4>
              <div className="space-y-1">
                {article.takeaways.slice(0, 2).map((takeaway, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className={cn(
                      'w-2 h-2 rounded-full mt-2 flex-shrink-0',
                      takeaway.importance === 'high' ? 'bg-red-500' :
                      takeaway.importance === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    )} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{takeaway.point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(article.publishedAt)}
              </span>
              <span>{article.source}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400">Read more</span>
              <ExternalLink className="w-3 h-3 text-gray-600 dark:text-gray-400" />
            </div>
          </div>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard 
      variant="interactive" 
      className="hover:bg-card-hover"
      onClick={() => onSelect(article)}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-xl line-clamp-3 text-black dark:text-white flex-1">
            {article.title}
          </h3>
          <div className={cn(
            'px-3 py-1 rounded-full text-xs font-medium border ml-4 flex-shrink-0',
            getCategoryColor(article.category)
          )}>
            {article.category}
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
          {article.content.substring(0, 200)}...
        </p>

        {article.isProcessing && (
          <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
            <LoadingSpinner size="sm" variant="brain" />
            <span className="text-sm text-primary font-medium">AI is analyzing this article...</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.source}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Read article</span>
            <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default NewsItem;