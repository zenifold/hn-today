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
  const baseUrl = "https://hn.algolia.com/api/v1";
  const endpoint = "/search";
  let searchQuery = query 
    ? `${query} site:news.google.com`
    : 'site:news.google.com';
    
  // Add sorting by date to get the most recent articles
  const url = `${baseUrl}${endpoint}?query=${encodeURIComponent(searchQuery)}&sortBy=created_at_i&tags=story`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch Google News");
  }
  
  const data = await response.json();
  // Filter out any results that don't have a URL or title
  const validResults = data.hits.filter((hit: any) => hit.url && hit.title);
  return validResults.slice(0, 100);
};