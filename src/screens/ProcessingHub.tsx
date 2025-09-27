// Screen 2: AI Processing Hub - Redesigned with Beautiful UI
import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { GlassCard } from '@/components/GlassCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useNews } from '@/context/NewsContext';
import aiService from '@/services/aiService';
import { Brain, Zap, FileText, CheckCircle, ArrowRight, Sparkles, Activity, TrendingUp } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export const ProcessingHub: React.FC = () => {
  const { state, dispatch, setScreen, updateProcessingProgress } = useNews();
  const [currentArticleTitle, setCurrentArticleTitle] = useState('');
  const [processedCount, setProcessedCount] = useState(0);

  useEffect(() => {
    processArticles();
  }, []);

  const processArticles = async () => {
    const articlesToProcess = state.articles.filter(article => !article.summary);
    const totalSteps = articlesToProcess.length * 3; // 3 steps per article
    let currentStep = 0;
    
    for (let i = 0; i < articlesToProcess.length; i++) {
      const article = articlesToProcess[i];
      setCurrentArticleTitle(article.title);
      
      // Step 1: Generate AI summary
      currentStep++;
      updateProcessingProgress(
        `Generating AI summary for "${article.title.substring(0, 50)}..."`,
        Math.min((currentStep / totalSteps) * 100, 95),
        i
      );

      // Mark article as processing
      dispatch({ 
        type: 'UPDATE_ARTICLE', 
        payload: { ...article, isProcessing: true }
      });

      // Process the article with AI
      const processedArticle = await aiService.processArticle(article);
      
      // Update the article with AI results
      dispatch({ 
        type: 'UPDATE_ARTICLE', 
        payload: processedArticle
      });

      // Step 2: Extract insights
      currentStep++;
      updateProcessingProgress(
        `Extracting key insights from "${article.title.substring(0, 50)}..."`,
        Math.min((currentStep / totalSteps) * 100, 95),
        i
      );

      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 3: Simplify language
      currentStep++;
      updateProcessingProgress(
        `Simplifying medical language for "${article.title.substring(0, 50)}..."`,
        Math.min((currentStep / totalSteps) * 100, 95),
        i
      );

      await new Promise(resolve => setTimeout(resolve, 300));
      
      setProcessedCount(i + 1);
    }

    // Complete processing
    updateProcessingProgress('All articles processed successfully!', 100, articlesToProcess.length);
    
    setTimeout(() => {
      dispatch({ type: 'COMPLETE_PROCESSING' });
    }, 1500);
  };

  const processingSteps = [
    {
      icon: FileText,
      title: 'Article Analysis',
      description: 'Reading and understanding content',
      completed: processedCount > 0
    },
    {
      icon: Brain,
      title: 'AI Summary Generation',
      description: 'Creating 2-line insights',
      completed: state.processingState.progress > 30
    },
    {
      icon: Zap,
      title: 'Key Takeaways',
      description: 'Extracting 3 main points',
      completed: state.processingState.progress > 60
    },
    {
      icon: CheckCircle,
      title: 'Language Simplification',
      description: 'Making content accessible',
      completed: state.processingState.progress > 90
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary-light/20 dark:from-background dark:to-primary-dark/20 overflow-hidden">
      {/* Professional Header */}
      <header className="w-full bg-background/90 backdrop-blur-lg border-b border-border shadow-sm flex-shrink-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-card rounded-xl shadow-sm border border-border relative">
                <img src="/logo.svg" alt="Health News Curator" className="absolute inset-0 w-6 h-6 lg:w-8 lg:h-8 m-auto" />
              </div>
              <div>
                <h1 className="text-lg lg:text-2xl font-bold text-black dark:text-white">AI Processing Hub</h1>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-300 hidden sm:block">Real-time Medical Content Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 lg:space-x-6">
              <ThemeToggle variant="glass" />
              <div className="flex items-center space-x-1 lg:space-x-2 text-primary">
                <Activity className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="text-xs lg:text-sm font-medium hidden sm:inline">Processing {state.articles.length} Articles</span>
                <span className="text-xs lg:text-sm font-medium sm:hidden">{state.articles.length}</span>
              </div>
              <div className="text-xl lg:text-3xl font-bold text-purple-600">
                {Math.round(state.processingState.progress)}%
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 container mx-auto px-4 lg:px-8 py-4 lg:py-6 overflow-hidden">
        <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
          
          {/* Left Column - Doctor Animation & Stats */}
          <div className="lg:col-span-3 flex lg:flex-col gap-3 lg:gap-4 lg:max-h-full lg:overflow-y-auto">
            {/* Doctor Animation */}
            <div className="flex-1 lg:flex-none glass-card rounded-2xl p-3 lg:p-5">
              <div className="text-center space-y-2 lg:space-y-3">
                <div className="w-32 h-32 lg:w-48 lg:h-48 xl:w-56 xl:h-56 mx-auto relative overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-full animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div style={{ transform: 'scale(1.2)' }}>
                      <Player
                        autoplay
                        loop
                        src="/animations/Doctor.json"
                        style={{ height: '100%', width: '100%' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm lg:text-xl font-bold text-black dark:text-white">Medical AI</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 hidden lg:block">Advanced Processing Engine</p>
                </div>
              </div>
            </div>

            {/* Live Stats */}
            <div className="flex lg:flex-col gap-2 lg:gap-3 flex-1 lg:flex-none">
              <div className="flex-1 lg:flex-none glass-card rounded-xl p-2 lg:p-4">
                <div className="flex lg:flex-row items-center lg:space-x-3">
                  <div className="w-6 h-6 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-1 lg:mb-0 mx-auto lg:mx-0">
                    <FileText className="w-3 h-3 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-sm lg:text-xl font-bold text-black dark:text-white">{state.articles.length}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Articles</div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 lg:flex-none glass-card rounded-xl p-2 lg:p-4">
                <div className="flex lg:flex-row items-center lg:space-x-3">
                  <div className="w-6 h-6 lg:w-10 lg:h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-1 lg:mb-0 mx-auto lg:mx-0">
                    <CheckCircle className="w-3 h-3 lg:w-5 lg:h-5 text-white" />
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-sm lg:text-xl font-bold text-black dark:text-white">{processedCount}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Processed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column - Main Processing */}
          <div className="lg:col-span-6 flex flex-col justify-center flex-1">
            {/* Main Processing Card */}
            <div className="glass-card rounded-2xl p-4 lg:p-8 flex flex-col justify-center min-h-[300px] lg:min-h-[400px]">
              <div className="text-center space-y-6">
                {/* Heart Animation */}
                <div className="w-24 h-24 lg:w-32 lg:h-32 mx-auto relative overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400/30 to-pink-400/30 rounded-full animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div style={{ transform: 'scale(1.2)' }}>
                      <Player
                        autoplay
                        loop
                        src="/animations/loading_Heart.json"
                        style={{ height: '100%', width: '100%', display: 'block' }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Status */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-lg lg:text-2xl font-bold text-black dark:text-white">
                      {state.processingState.currentStep}
                    </h2>
                    <p className="text-xs lg:text-base text-gray-600 dark:text-gray-300">
                      Our medical AI is analyzing health content with precision
                    </p>
                  </div>
                  
                  {currentArticleTitle && (
                    <div className="bg-muted/30 rounded-xl p-3 lg:p-5">
                      <p className="text-gray-600 dark:text-gray-400 text-xs font-medium mb-1">
                        Currently Processing:
                      </p>
                      <p className="text-black dark:text-white font-semibold text-xs lg:text-base">
                        {currentArticleTitle.substring(0, 40)}...
                      </p>
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="space-y-2 lg:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-black dark:text-white font-medium text-xs lg:text-base">Processing Progress</span>
                      <span className="text-lg lg:text-3xl font-bold text-purple-600">{Math.round(state.processingState.progress)}%</span>
                    </div>
                    
                      <div className="relative h-3 lg:h-5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-purple-500 to-primary-dark rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${state.processingState.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
                        <div className="absolute right-0 top-0 w-1 h-full bg-white/60 animate-pulse" />
                      </div>
                    </div>
                    
                    <div className="text-center">
                        <span className="text-gray-600 dark:text-gray-400 font-medium text-xs">
                          {state.processingState.articlesProcessed} of {state.processingState.totalArticles} articles processed
                        </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Processing Pipeline */}
          <div className="lg:col-span-3 flex flex-col max-h-full overflow-y-auto">
            <h3 className="text-base lg:text-xl font-bold text-black dark:text-white mb-2 lg:mb-3">Processing Pipeline</h3>
            
            <div className="space-y-2 flex-1 grid grid-cols-2 lg:grid-cols-1 lg:space-y-3 gap-2 lg:gap-0">
              {processingSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`glass-card rounded-xl p-2 lg:p-4 transition-all duration-500 ${
                    step.completed 
                      ? 'border-success/30 bg-success/5' 
                      : ''
                  }`}
                >
                  <div className="flex lg:flex-row items-start space-x-2">
                    <div className={`w-6 h-6 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
                      step.completed 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <step.icon className="w-3 h-3 lg:w-5 lg:h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-black dark:text-white mb-1 text-xs lg:text-sm">
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed hidden lg:block">
                        {step.description}
                      </p>
                      {step.completed && (
                        <div className="mt-1 flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-success font-medium hidden lg:inline">Completed</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Completion Section */}
        {state.processingState.progress === 100 && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-r from-success to-emerald-500 rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl text-center text-white max-w-md mx-4">
              <div className="space-y-4 lg:space-y-6">
                <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto">
                  <CheckCircle className="w-full h-full text-white drop-shadow-lg" />
                </div>
                <div className="space-y-2 lg:space-y-3">
                  <h3 className="text-2xl lg:text-3xl font-bold">
                    Processing Complete! 🎉
                  </h3>
                  <p className="text-base lg:text-lg text-green-50">
                    Your personalized health news feed is ready with AI-generated summaries and key medical insights.
                  </p>
                </div>
                  <button
                    onClick={() => setScreen('feed')}
                    className="bg-white text-success px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-bold text-base lg:text-lg hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2 lg:gap-3 mx-auto group shadow-xl"
                >
                  <Sparkles className="w-5 h-5 lg:w-6 lg:h-6" />
                  View Your Curated Feed
                  <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingHub;