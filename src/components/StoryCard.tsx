import { Story } from "@/lib/api";
import { ArrowUpCircle, ExternalLink } from "lucide-react";

interface StoryCardProps {
  story: Story;
}

export const StoryCard = ({ story }: StoryCardProps) => {
  return (
    <div className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
      <h2 className="font-mono text-lg font-semibold mb-2 line-clamp-2">
        {story.title}
      </h2>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <ArrowUpCircle className="w-4 h-4 text-hn-orange" />
          <span>{story.points}</span>
        </div>
        <a
          href={story.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1 text-hn-orange hover:underline"
        >
          <span>Read more</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};