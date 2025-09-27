// Screen 1: Professional News Loading Interface
import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNews } from '@/context/NewsContext';
import { mockHealthArticles } from '@/data/mockNews';
import rssService from '@/services/rssService';
import { Rss, RefreshCw, Zap, Brain, CheckCircle, ArrowRight, Activity, TrendingUp, Shield, Users, Globe, Link, AlertCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export const NewsLoader: React.FC = () => {
  const { dispatch, setScreen } = useNews();
  const [loadingStep, setLoadingStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [feedSource, setFeedSource] = useState<'mock' | 'rss'>('mock');
  const [rssUrl, setRssUrl] = useState('');
  const [rssError, setRssError] = useState('');
  const [showRssForm, setShowRssForm] = useState(false);
  const [isTestingFeed, setIsTestingFeed] = useState(false);

  const loadingSteps = [
    { icon: Rss, text: 'Fetching health news feeds...', duration: 1500 },
    { icon: RefreshCw, text: 'Analyzing article quality...', duration: 1200 },
    { icon: Zap, text: 'Filtering relevant content...', duration: 1000 },
    { icon: Brain, text: 'Preparing AI analysis...', duration: 800 }
  ];

  const startLoading = async () => {
    setIsLoading(true);
    setLoadingStep(0);
    setRssError('');

    try {
      // Simulate loading steps
      for (let i = 0; i < loadingSteps.length; i++) {
        setLoadingStep(i);
        await new Promise(resolve => setTimeout(resolve, loadingSteps[i].duration));
      }

      let articles;
      
      if (feedSource === 'rss') {
        if (!rssUrl.trim()) {
          throw new Error('Please enter a valid RSS feed URL');
        }
        
        if (!rssService.isValidRSSUrl(rssUrl.trim())) {
          throw new Error('Please enter a valid HTTP/HTTPS URL');
        }
        
        // Fetch articles from RSS feed
        setLoadingStep(1); // Update to show "Analyzing article quality..."
        articles = await rssService.fetchRSSFeed(rssUrl.trim());
        
        if (articles.length === 0) {
          throw new Error('No articles found in RSS feed');
        }
        
        console.log(`Successfully loaded ${articles.length} articles from RSS feed`);
      } else {
        // Use mock articles
        articles = mockHealthArticles;
      }

      // Load articles and start processing
      dispatch({ type: 'SET_ARTICLES', payload: articles });
      dispatch({ type: 'START_PROCESSING', payload: articles });
      setScreen('processing');
    } catch (error) {
      console.error('Loading error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load articles';
      setRssError(errorMessage);
      setIsLoading(false);
      setLoadingStep(0);
    }
  };

  const popularFeeds = rssService.getPopularHealthFeeds();
  
  const testRssFeed = async (url: string) => {
    setIsTestingFeed(true);
    setRssError('');
    
    try {
      const articles = await rssService.fetchRSSFeed(url);
      setRssError('');
      alert(`✅ RSS feed is valid! Found ${articles.length} articles.`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to test RSS feed';
      setRssError(`Test failed: ${errorMessage}`);
    } finally {
      setIsTestingFeed(false);
    }
  };

  const CurrentIcon = loadingSteps[loadingStep]?.icon || Rss;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-light/20 dark:from-background dark:to-primary-dark/20">
      {/* Professional Header */}
      <header className="w-full bg-background/90 dark:bg-background/90 backdrop-blur-lg border-b border-border shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="w-8 h-8 lg:w-12 lg:h-12 bg-card rounded-lg lg:rounded-xl shadow-sm border border-border relative">
                <img src="/logo.svg" alt="Health News Curator" className="absolute inset-0 w-5 h-5 lg:w-8 lg:h-8 m-auto" />
              </div>
              <div>
                <h1 className="text-base lg:text-2xl font-bold !text-black dark:!text-white">Health News Curator</h1>
                <p className="text-xs !text-gray-600 dark:!text-gray-300 hidden lg:block">AI-Powered Medical Intelligence</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-6">
              <ThemeToggle variant="glass" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Scrollable */}
      <div className="container mx-auto px-4 lg:px-8 py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 min-h-[calc(100vh-100px)]">
          
          {/* Left Column - Doctor Animation */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            <div className="glass-card rounded-2xl p-4 lg:p-6">
              <div className="text-center space-y-3 lg:space-y-4">
                <div className="w-50 h-50 lg:w-64 lg:h-64 xl:w-72 xl:h-72 mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full animate-pulse" />
                  <Player
                    autoplay
                    loop
                    src="/animations/Doctor (1).json"
                    style={{ height: '100%', width: '100%' }}
                  />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg lg:text-xl xl:text-2xl font-bold !text-black dark:!text-white">
                    Advanced AI Analysis
                  </h2>
                  <p className="text-sm lg:text-base !text-gray-600 dark:!text-gray-300 leading-relaxed">
                    Our medical AI processes thousands of health articles daily, delivering personalized insights tailored to your professional needs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column - Main Action */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-3 lg:space-y-4">
            {/* Main Card */}
            <div className="glass-card rounded-2xl p-4 lg:p-6 xl:p-8">
              {!isLoading ? (
                <div className="text-center space-y-4 lg:space-y-6">
                  <div className="space-y-2 lg:space-y-3">
                    <h1 className="text-lg sm:text-xl lg:text-3xl xl:text-4xl font-bold !text-black dark:!text-white leading-tight">
                      Ready to Process Today's
                      <span className="block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"> Health Intelligence</span>?
                    </h1>
                    <p className="text-sm lg:text-base xl:text-lg !text-gray-600 dark:!text-gray-300 leading-relaxed">
                      Load the latest medical articles and let our advanced AI create comprehensive summaries, extract key insights, and simplify complex medical terminology.
                    </p>
                  </div>
                  
                  {/* Source Selection */}
                  <div className="space-y-3 lg:space-y-4">
                    <div className="grid grid-cols-2 gap-2 lg:gap-3">
                      <button
                        onClick={() => { setFeedSource('mock'); setRssError(''); }}
                        className={`py-3 px-3 rounded-lg lg:rounded-xl text-sm font-medium transition-all duration-300 ${
                          feedSource === 'mock'
                            ? 'bg-primary text-primary-foreground shadow-lg'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Brain className="w-4 h-4" />
                          <span>Demo Articles</span>
                        </div>
                      </button>
                      <button
                        onClick={() => { setFeedSource('rss'); setRssError(''); }}
                        className={`py-3 px-3 rounded-lg lg:rounded-xl text-sm font-medium transition-all duration-300 ${
                          feedSource === 'rss'
                            ? 'bg-success text-success-foreground shadow-lg'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Globe className="w-4 h-4" />
                          <span>RSS Feed</span>
                        </div>
                      </button>
                    </div>
                    
                    {/* RSS URL Input */}
                    {feedSource === 'rss' && (
                      <div className="space-y-2 lg:space-y-3">
                        <div className="space-y-2">
                          <div className="relative">
                            <input
                              type="url"
                              value={rssUrl}
                              onChange={(e) => { setRssUrl(e.target.value); setRssError(''); }}
                              placeholder="Enter RSS feed URL (e.g., https://example.com/rss)"
                              className="glass-input w-full py-3 px-3 pl-9 pr-20 rounded-lg text-sm text-foreground placeholder:text-muted-foreground"
                            />
                            <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            {rssUrl.trim() && (
                              <button
                                onClick={() => testRssFeed(rssUrl.trim())}
                                disabled={isTestingFeed}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 disabled:opacity-50 transition-colors"
                              >
                                {isTestingFeed ? 'Testing...' : 'Test'}
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {/* Popular Feeds */}
                        <div className="text-left">
                          <button
                            onClick={() => setShowRssForm(!showRssForm)}
                            className="text-xs text-primary hover:text-primary/80 underline"
                          >
                            Popular Health RSS Feeds
                          </button>
                          {showRssForm && (
                            <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                              {popularFeeds.map((feed, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <button
                                    onClick={() => { setRssUrl(feed.url); setShowRssForm(false); setRssError(''); }}
                                    className="flex-1 text-left p-2 bg-muted/50 hover:bg-muted rounded-lg text-xs transition-colors"
                                  >
                                    <div className="font-medium text-foreground">{feed.name}</div>
                                    <div className="text-muted-foreground text-xs">{feed.description}</div>
                                  </button>
                                  <button
                                    onClick={() => testRssFeed(feed.url)}
                                    disabled={isTestingFeed}
                                    className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 disabled:opacity-50 flex-shrink-0 transition-colors"
                                  >
                                    Test
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Error Display */}
                    {rssError && (
                      <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-xs">
                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-destructive" />
                        <span className="leading-relaxed">{rssError}</span>
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={startLoading}
                    disabled={feedSource === 'rss' && !rssUrl.trim()}
                    className="bg-blue-500 hover:bg-blue-700 group relative w-full py-4 px-4 rounded-xl font-bold text-sm text-white shadow-2xl hover:shadow-primary/25 transition-all duration-500 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Rss className="w-4 h-4 group-hover:animate-pulse" />
                      <span>Process {feedSource === 'rss' ? 'RSS Feed' : 'Demo Articles'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-4 lg:space-y-6">
                  {/* Loading Animation */}
                  <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400/30 to-pink-400/30 rounded-full animate-pulse" />
                    <div className="relative w-20 h-20 lg:w-28 lg:h-28 flex items-center justify-center">
                      <Player
                        autoplay
                        loop
                        src="/animations/loading_Heart.json"
                        style={{ height: '100%', width: '100%', display: 'block' }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4 lg:space-y-6">
                    <div className="space-y-2 lg:space-y-3">
                    <h2 className="text-lg lg:text-2xl font-bold text-foreground">
                      {loadingSteps[loadingStep]?.text || 'Processing...'}
                    </h2>
                    <p className="text-sm lg:text-base text-muted-foreground">
                        Our AI is working hard to analyze medical content
                      </p>
                    </div>
                    
                    {/* Enhanced Progress */}
                    <div className="bg-muted/30 rounded-xl lg:rounded-2xl p-4 lg:p-6">
                      <div className="flex items-center justify-between mb-3 lg:mb-4">
                        <span className="text-sm lg:text-base text-foreground font-medium">Processing Progress</span>
                        <span className="text-2xl lg:text-3xl font-bold text-primary">
                          {Math.round(((loadingStep + 1) / loadingSteps.length) * 100)}%
                        </span>
                      </div>
                      
                      <div className="relative h-3 lg:h-5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-purple-500 to-primary-dark rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                        >
                          <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
                          <div className="absolute right-0 top-0 w-1 lg:w-2 h-full bg-white/60 animate-pulse" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center mt-3 lg:mt-4 gap-2">
                        <CurrentIcon className="w-4 h-4 lg:w-5 lg:h-5 text-primary animate-pulse" />
                        <span className="text-xs lg:text-sm text-muted-foreground font-medium">
                          Step {loadingStep + 1} of {loadingSteps.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: TrendingUp, label: 'Accuracy', value: '99.2%', color: 'text-green-600' },
                { icon: Activity, label: 'Speed', value: '<2s', color: 'text-blue-600' },
                { icon: Shield, label: 'Security', value: 'Grade A', color: 'text-purple-600' }
              ].map((stat, index) => (
                <div key={index} className="glass-card rounded-xl p-3 text-center">
                  <stat.icon className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
                  <div className="text-sm font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Features */}
          <div className="lg:col-span-3 order-3 lg:order-3">
            <h3 className="text-base font-bold text-foreground mb-3">AI Capabilities</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {[
                { 
                  icon: Brain, 
                  title: 'Smart Summaries', 
                  desc: 'AI generates concise 2-line insights from complex medical articles',
                  color: 'from-blue-500 to-blue-600'
                },
                { 
                  icon: Zap, 
                  title: 'Key Takeaways', 
                  desc: 'Extracts 3 most important points with clinical relevance scoring',
                  color: 'from-yellow-500 to-orange-500'
                },
                { 
                  icon: RefreshCw, 
                  title: 'Language Simplification', 
                  desc: 'Converts medical jargon into accessible, patient-friendly language',
                  color: 'from-green-500 to-green-600'
                },
                { 
                  icon: CheckCircle, 
                  title: 'Evidence Validation', 
                  desc: 'Cross-references with medical databases for accuracy verification',
                  color: 'from-purple-500 to-purple-600'
                }
              ].map((feature, index) => (
                <div key={index} className="glass-card rounded-xl p-3 hover:bg-card-hover transition-all duration-300">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground mb-1 text-sm">{feature.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLoader;