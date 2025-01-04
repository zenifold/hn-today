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

export const fetchLatestNews = async (query?: string): Promise<Story[]> => {
  const apiKey = localStorage.getItem("mediastackApiKey");
  if (!apiKey) {
    throw new Error("Please provide a MediaStack API key");
  }

  const baseUrl = 'http://api.mediastack.com/v1/news';
  const params = new URLSearchParams({
    access_key: apiKey,
    languages: 'en',
    limit: '100',
    sort: 'published_desc'
  });

  if (query) {
    params.append('keywords', query);
  }

  const url = `${baseUrl}?${params.toString()}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.info || "Failed to fetch news");
  }

  return data.data.map((article: any, index: number) => ({
    objectID: `ms-${index}`,
    title: article.title,
    points: 0,
    url: article.url,
    author: article.source || 'Unknown',
    created_at: article.published_at
  }));
};