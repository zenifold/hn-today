import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTopStories } from "@/lib/api";
import { StoryCard } from "@/components/StoryCard";
import { StoryCardSkeleton } from "@/components/StoryCardSkeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: stories, isLoading } = useQuery({
    queryKey: ["stories", searchQuery],
    queryFn: () => fetchTopStories(searchQuery),
    staleTime: 60000, // Cache for 1 minute
  });

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-mono font-bold text-hn-orange mb-4">
            Hacker News Today
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading
            ? Array.from({ length: 12 }).map((_, i) => (
                <StoryCardSkeleton key={i} />
              ))
            : stories?.map((story) => (
                <StoryCard key={story.objectID} story={story} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Index;