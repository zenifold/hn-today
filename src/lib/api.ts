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