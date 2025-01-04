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
  const apiKey = localStorage.getItem("newsApiKey");
  const baseUrl = 'https://newsapi.org/v2/top-headlines';
  const country = 'us';
  
  // Check if we're running on localhost
  const isLocalhost = 
    window.location.hostname === "localhost" || 
    window.location.hostname === "127.0.0.1";

  if (!isLocalhost) {
    throw new Error(
      "NewsAPI's Developer plan only allows requests from localhost. Please run the application locally or upgrade to a paid plan."
    );
  }
  
  const url = query
    ? `${baseUrl}?q=${encodeURIComponent(query)}&apiKey=${apiKey}&country=${country}`
    : `${baseUrl}?apiKey=${apiKey}&country=${country}`;
    
  const response = await fetch(url);
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch Google News");
  }
  
  // Transform NewsAPI response to match our Story interface
  return data.articles.map((article: any, index: number) => ({
    objectID: `gn-${index}`,
    title: article.title,
    points: 0,
    url: article.url,
    author: article.author || 'Unknown',
    created_at: article.publishedAt
  }));
};