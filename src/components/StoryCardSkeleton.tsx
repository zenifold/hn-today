export const StoryCardSkeleton = () => {
  return (
    <div className="p-4 rounded-lg border bg-card">
      <div className="h-6 bg-muted rounded animate-pulse mb-2"></div>
      <div className="h-6 bg-muted rounded animate-pulse w-3/4"></div>
      <div className="flex items-center justify-between mt-4">
        <div className="h-4 bg-muted rounded animate-pulse w-16"></div>
        <div className="h-4 bg-muted rounded animate-pulse w-24"></div>
      </div>
    </div>
  );
};