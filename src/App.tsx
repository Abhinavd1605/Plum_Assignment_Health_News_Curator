import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NewsProvider, useNews } from "@/context/NewsContext";
import NewsLoader from "@/screens/NewsLoader";
import ProcessingHub from "@/screens/ProcessingHub";
import CuratedFeed from "@/screens/CuratedFeed";
import ArticleExpanded from "@/screens/ArticleExpanded";

const queryClient = new QueryClient();

const AppRouter = () => {
  const { state } = useNews();
  
  switch (state.currentScreen) {
    case 'loader':
      return <NewsLoader />;
    case 'processing':
      return <ProcessingHub />;
    case 'feed':
      return <CuratedFeed />;
    case 'article':
      return <ArticleExpanded />;
    default:
      return <NewsLoader />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <NewsProvider>
        <AppRouter />
      </NewsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
