// Screen 4: Professional Article Expansion
import React, { useState } from 'react';
import { useNews } from '@/context/NewsContext';
import aiService from '@/services/aiService';
import { ArrowLeft, Calendar, ExternalLink, Brain, Lightbulb, Activity, Clock, TrendingUp, CheckCircle, RefreshCw } from 'lucide-react';

export const ArticleExpanded: React.FC = () => {
  const { state, setScreen, dispatch } = useNews();
  const article = state.selectedArticle;
  const [isReanalyzing, setIsReanalyzing] = useState(false);

  if (!article) {
    setScreen('feed');
    return null;
  }

  const handleReanalyze = async () => {
    setIsReanalyzing(true);
    try {
      // Re-process the article with AI
      const reprocessedArticle = await aiService.processArticle(article);
      
      // Update the article in the context
      dispatch({ 
        type: 'UPDATE_ARTICLE', 
        payload: reprocessedArticle
      });
      
      // Show success message
      alert('Article re-analyzed successfully!');
    } catch (error) {
      console.error('Error re-analyzing article:', error);
      alert('Failed to re-analyze article. Please try again.');
    } finally {
      setIsReanalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Professional Header */}
      <header className="w-full bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setScreen('feed')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-200 relative">
                <img src="/logo.svg" alt="Health News Curator" className="absolute inset-0 w-8 h-8 m-auto" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 truncate">{article.title}</h1>
                <p className="text-sm text-gray-600">Detailed Article Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">AI Processed</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          
          {/* Left Sidebar - Article Info */}
          <div className="col-span-12 lg:col-span-3 space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-2xl border border-white/50">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Article Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Published</p>
                    <p className="font-medium text-gray-900">{article.publishedAt.toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Source</p>
                    <p className="font-medium text-gray-900">{article.source}</p>
                  </div>
                </div>
                {article.summary && (
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">Confidence</p>
                      <p className="font-medium text-gray-900">{Math.round(article.summary.confidence * 100)}%</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-white/50">
              <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => window.open(article.url, '_blank')}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 group"
                >
                  <ExternalLink className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                  <span className="text-gray-700 group-hover:text-gray-900">View Original</span>
                </button>
                <button 
                  onClick={handleReanalyze}
                  disabled={isReanalyzing}
                  className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isReanalyzing ? (
                    <RefreshCw className="w-4 h-4 text-purple-600 animate-spin" />
                  ) : (
                    <Brain className="w-4 h-4 text-purple-600 group-hover:text-purple-700" />
                  )}
                  <span className="text-gray-700 group-hover:text-gray-900">
                    {isReanalyzing ? 'Re-analyzing...' : 'Re-analyze'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="space-y-4 lg:space-y-6">
              
              {/* AI Summary */}
              {article.summary && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl border border-blue-200/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">AI Summary</h2>
                      <p className="text-blue-600">Intelligent content analysis</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/70 rounded-xl p-4">
                      <p className="text-lg text-gray-900 leading-relaxed">{article.summary.tldr[0]}</p>
                    </div>
                    <div className="bg-white/70 rounded-xl p-4">
                      <p className="text-lg text-gray-900 leading-relaxed">{article.summary.tldr[1]}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Key Takeaways */}
              {article.takeaways && (
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl border border-white/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Key Takeaways</h2>
                      <p className="text-yellow-600">Essential insights extracted</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {article.takeaways.map((takeaway, index) => (
                      <div key={index} className="bg-gray-50/80 rounded-xl p-4 flex gap-4">
                        <div className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 ${
                          takeaway.importance === 'high' ? 'bg-red-500' :
                          takeaway.importance === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 mb-2">{takeaway.point}</p>
                          {takeaway.explanation && (
                            <p className="text-gray-600 leading-relaxed">{takeaway.explanation}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Simplified Content */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl border border-white/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Article Content</h2>
                    <p className="text-green-600">Simplified for accessibility</p>
                  </div>
                </div>
                <div className="prose prose-lg max-w-none">
                  <div className="bg-gray-50/80 rounded-xl p-6">
                    <p className="text-gray-900 leading-relaxed whitespace-pre-wrap text-base lg:text-lg">
                      {article.simplifiedContent || article.content}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleExpanded;