// React Context for managing news state and AI processing
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Article, ProcessingState, HealthCategory, NewsFilter } from '@/types';
import { mockHealthArticles } from '@/data/mockNews';

interface NewsState {
  articles: Article[];
  currentScreen: 'loader' | 'processing' | 'feed' | 'article';
  selectedArticle: Article | null;
  processingState: ProcessingState;
  filter: NewsFilter;
  isRefreshing: boolean;
  error: string | null;
}

type NewsAction =
  | { type: 'SET_SCREEN'; payload: NewsState['currentScreen'] }
  | { type: 'SET_ARTICLES'; payload: Article[] }
  | { type: 'SET_SELECTED_ARTICLE'; payload: Article | null }
  | { type: 'UPDATE_ARTICLE'; payload: Article }
  | { type: 'SET_PROCESSING_STATE'; payload: ProcessingState }
  | { type: 'SET_FILTER'; payload: NewsFilter }
  | { type: 'SET_REFRESHING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'START_PROCESSING'; payload: Article[] }
  | { type: 'COMPLETE_PROCESSING' };

const initialState: NewsState = {
  articles: [],
  currentScreen: 'loader',
  selectedArticle: null,
  processingState: {
    isLoading: false,
    currentStep: '',
    progress: 0,
    articlesProcessed: 0,
    totalArticles: 0
  },
  filter: {},
  isRefreshing: false,
  error: null
};

const newsReducer = (state: NewsState, action: NewsAction): NewsState => {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, currentScreen: action.payload };
    
    case 'SET_ARTICLES':
      return { ...state, articles: action.payload };
    
    case 'SET_SELECTED_ARTICLE':
      return { ...state, selectedArticle: action.payload };
    
    case 'UPDATE_ARTICLE':
      return {
        ...state,
        articles: state.articles.map(article =>
          article.id === action.payload.id ? action.payload : article
        ),
        selectedArticle: state.selectedArticle?.id === action.payload.id 
          ? action.payload 
          : state.selectedArticle
      };
    
    case 'SET_PROCESSING_STATE':
      return { ...state, processingState: action.payload };
    
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    
    case 'SET_REFRESHING':
      return { ...state, isRefreshing: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'START_PROCESSING':
      return {
        ...state,
        currentScreen: 'processing',
        processingState: {
          isLoading: true,
          currentStep: 'Analyzing articles...',
          progress: 0,
          articlesProcessed: 0,
          totalArticles: action.payload.length
        }
      };
    
    case 'COMPLETE_PROCESSING':
      return {
        ...state,
        currentScreen: 'feed',
        processingState: {
          ...state.processingState,
          isLoading: false,
          currentStep: 'Complete!',
          progress: 100
        }
      };
    
    default:
      return state;
  }
};

interface NewsContextType {
  state: NewsState;
  dispatch: React.Dispatch<NewsAction>;
  // Convenience methods
  setScreen: (screen: NewsState['currentScreen']) => void;
  selectArticle: (article: Article | null) => void;
  updateProcessingProgress: (step: string, progress: number, articlesProcessed: number) => void;
  setFilter: (filter: NewsFilter) => void;
  toggleRefresh: () => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(newsReducer, initialState);

  const setScreen = (screen: NewsState['currentScreen']) => {
    dispatch({ type: 'SET_SCREEN', payload: screen });
  };

  const selectArticle = (article: Article | null) => {
    dispatch({ type: 'SET_SELECTED_ARTICLE', payload: article });
    if (article) {
      setScreen('article');
    }
  };

  const updateProcessingProgress = (step: string, progress: number, articlesProcessed: number) => {
    // Ensure progress never decreases
    const currentProgress = state.processingState.progress;
    const newProgress = Math.max(progress, currentProgress);
    
    dispatch({
      type: 'SET_PROCESSING_STATE',
      payload: {
        ...state.processingState,
        currentStep: step,
        progress: newProgress,
        articlesProcessed
      }
    });
  };

  const setFilter = (filter: NewsFilter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const toggleRefresh = () => {
    dispatch({ type: 'SET_REFRESHING', payload: !state.isRefreshing });
  };

  return (
    <NewsContext.Provider value={{
      state,
      dispatch,
      setScreen,
      selectArticle,
      updateProcessingProgress,
      setFilter,
      toggleRefresh
    }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};

export default NewsContext;