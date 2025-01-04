export interface Story {
  objectID: string;
  title: string;
  points: number;
  url: string;
  author: string;
  created_at: string;
}

export const fetchTopStories = async (query?: string): Promise<Story[]> => {
  const baseUrl = "https://hn.algolia.com/api/v1";
  const endpoint = query ? "/search" : "/search?tags=front_page";
  const url = `${baseUrl}${endpoint}${query ? `?query=${encodeURIComponent(query)}` : ""}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch stories");
  }
  
  const data = await response.json();
  return data.hits.slice(0, 100);
};

export const fetchGoogleNews = async (query?: string): Promise<Story[]> => {
  const API_KEY = 'YOUR_API_KEY'; // We should handle this securely
  const baseUrl = 'https://newsapi.org/v2/top-headlines';
  const country = 'us';
  
  const url = query
    ? `${baseUrl}?q=${encodeURIComponent(query)}&apiKey=${API_KEY}&country=${country}`
    : `${baseUrl}?apiKey=${API_KEY}&country=${country}`;
    
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch Google News");
  }
  
  const data = await response.json();
  
  // Transform NewsAPI response to match our Story interface
  return data.articles.map((article: any, index: number) => ({
    objectID: `gn-${index}`, // Generate a unique ID
    title: article.title,
    points: 0, // NewsAPI doesn't have points
    url: article.url,
    author: article.author || 'Unknown',
    created_at: article.publishedAt
  }));
};