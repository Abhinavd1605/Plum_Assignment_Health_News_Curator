// Screen 3: Professional Curated Feed
import React, { useState } from 'react';
import { NewsItem } from '@/components/NewsItem';
import { useNews } from '@/context/NewsContext';
import { RefreshCw, Filter, Search, ArrowLeft, Activity, TrendingUp, CheckCircle, Users } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Professional Header */}
      <header className="w-full bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setScreen('loader')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 relative">
                <img src="/logo.svg" alt="Health News Curator" className="absolute inset-0 w-8 h-8 m-auto" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Curated Health Feed</h1>
                <p className="text-sm text-gray-600">AI-Processed Medical Intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">{processedArticles.length} Articles Ready</span>
              </div>
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          
          {/* Left Sidebar - Stats */}
          <div className="col-span-12 lg:col-span-3 space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-2xl border border-white/50">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Feed Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Total Articles</span>
                  <span className="text-xl font-bold text-gray-900">{processedArticles.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">AI Processed</span>
                  <span className="text-xl font-bold text-green-600">100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Quality Score</span>
                  <span className="text-xl font-bold text-purple-600">A+</span>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50">
              <h4 className="font-semibold text-gray-900 mb-3">Quick Filters</h4>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors">
                  All Articles
                </button>
                <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors">
                  Recent Updates
                </button>
                <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors">
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
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Activity className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Articles Available</h3>
                  <p className="text-gray-600 mb-4">Process some health articles to see them here.</p>
                  <button
                    onClick={() => setScreen('loader')}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
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