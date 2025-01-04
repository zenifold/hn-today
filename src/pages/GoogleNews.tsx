import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGoogleNews } from "@/lib/api";
import { StoryCard } from "@/components/StoryCard";
import { StoryCardSkeleton } from "@/components/StoryCardSkeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const GoogleNews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState(localStorage.getItem("newsApiKey") || "");
  
  const { data: stories, isLoading, error } = useQuery({
    queryKey: ["google-news", searchQuery],
    queryFn: () => fetchGoogleNews(searchQuery),
    staleTime: 60000,
    enabled: !!apiKey,
  });

  const handleApiKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (e.currentTarget.elements.namedItem('apiKey') as HTMLInputElement).value;
    localStorage.setItem("newsApiKey", input);
    setApiKey(input);
    toast({
      title: "API Key Saved",
      description: "Your News API key has been saved successfully.",
    });
  };

  if (!apiKey) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-8">
        <div className="max-w-md mx-auto mt-20">
          <form onSubmit={handleApiKeySubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-center">Enter News API Key</h2>
            <p className="text-sm text-muted-foreground text-center">
              Get your API key from{" "}
              <a
                href="https://newsapi.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                newsapi.org
              </a>
            </p>
            <Input
              type="text"
              name="apiKey"
              placeholder="Enter your News API key"
              required
            />
            <Button type="submit" className="w-full">
              Save API Key
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-7xl mx-auto">
        <Navigation />
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-mono font-bold text-primary mb-4">
            Google News Today
          </h1>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search stories..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {error ? (
          <div className="text-center space-y-4">
            <div className="text-red-500">
              {error instanceof Error ? error.message : "Error loading news. Please check your API key."}
            </div>
            {error instanceof Error && error.message.includes("localhost") && (
              <div className="text-sm text-muted-foreground">
                To use the NewsAPI Developer plan, please run this application locally using 'npm run dev' or 'yarn dev'.
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading
              ? Array.from({ length: 12 }).map((_, i) => (
                  <StoryCardSkeleton key={i} />
                ))
              : stories?.map((story) => (
                  <StoryCard key={story.objectID} story={story} />
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleNews;