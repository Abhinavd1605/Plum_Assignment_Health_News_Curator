// Screen 3: Professional Curated Feed
import React, { useState } from 'react';
import { NewsItem } from '@/components/NewsItem';
import { useNews } from '@/context/NewsContext';
import { RefreshCw, Filter, Search, ArrowLeft, Activity, TrendingUp, CheckCircle, Users } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export const CuratedFeed: React.FC = () => {
  const { state, selectArticle, setScreen } = useNews();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Simulate fetching new articles (in real app, this would fetch from RSS)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you could dispatch a refresh action to reload articles
      // dispatch({ type: 'REFRESH_ARTICLES' });
      
      console.log('Feed refreshed successfully');
    } catch (error) {
      console.error('Failed to refresh feed:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const processedArticles = state.articles.filter(article => article.summary);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-light/20 dark:from-background dark:to-primary-dark/20">
      {/* Professional Header */}
      <header className="w-full bg-background/90 backdrop-blur-lg border-b border-border shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setScreen('loader')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-12 h-12 bg-card rounded-xl shadow-sm border border-border relative">
                <img src="/logo.svg" alt="Health News Curator" className="absolute inset-0 w-8 h-8 m-auto" />
              </div>
              <div>
                <h1 className="text-2xl font-bold !text-black dark:!text-white">Curated Health Feed</h1>
                <p className="text-sm !text-gray-600 dark:!text-gray-300">AI-Processed Medical Intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-success">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{processedArticles.length} Articles Ready</span>
              </div>
              <div className="flex items-center space-x-3">
                <ThemeToggle variant="glass" />
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl font-medium flex items-center gap-2 text-white transition-all duration-300 shadow-lg"
              >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          
          {/* Left Sidebar - Stats */}
          <div className="col-span-12 lg:col-span-3 space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="glass-card rounded-2xl lg:rounded-3xl p-4 lg:p-6">
              <h3 className="text-lg font-bold !text-black dark:!text-white mb-4">Feed Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="!text-gray-600 dark:!text-gray-400 text-sm">Total Articles</span>
                  <span className="text-xl font-bold !text-black dark:!text-white">{processedArticles.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="!text-gray-600 dark:!text-gray-400 text-sm">AI Processed</span>
                  <span className="text-xl font-bold !text-green-600">100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="!text-gray-600 dark:!text-gray-400 text-sm">Quality Score</span>
                  <span className="text-xl font-bold !text-purple-600">A+</span>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="glass-card rounded-2xl p-4">
              <h4 className="font-semibold !text-black dark:!text-white mb-3">Quick Filters</h4>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm !text-black dark:!text-white rounded-lg hover:bg-muted/50 transition-colors">
                  All Articles
                </button>
                <button className="w-full text-left px-3 py-2 text-sm !text-black dark:!text-white rounded-lg hover:bg-muted/50 transition-colors">
                  Recent Updates
                </button>
                <button className="w-full text-left px-3 py-2 text-sm !text-black dark:!text-white rounded-lg hover:bg-muted/50 transition-colors">
                  High Priority
                </button>
              </div>
            </div>
          </div>

          {/* Main Feed */}
          <div className="col-span-12 lg:col-span-9">
            <div className="space-y-4 lg:space-y-6">
              {processedArticles.length > 0 ? (
                processedArticles.map((article) => (
                  <NewsItem
                    key={article.id}
                    article={article}
                    onSelect={selectArticle}
                    variant="summary"
                  />
                ))
              ) : (
                <div className="glass-card rounded-2xl p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Activity className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold !text-black dark:!text-white mb-2">No Articles Available</h3>
                  <p className="!text-gray-600 dark:!text-gray-400 mb-4">Process some health articles to see them here.</p>
                  <button
                    onClick={() => setScreen('loader')}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-medium text-white transition-all duration-300"
                  >
                    Load Articles
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuratedFeed;