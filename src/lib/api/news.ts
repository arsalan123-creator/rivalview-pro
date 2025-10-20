export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  source: string;
  date: string;
  url?: string;
}

export interface NewsResponse {
  data: NewsArticle[];
  total: number;
  page: number;
  page_size: number;
}

export const getNewsArticles = async (
  companyId: string,
  page: number = 1,
  pageSize: number = 10,
  month?: string,
  year?: number
): Promise<NewsResponse> => {
  const params = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    page_size: pageSize.toString(),
    ...(month && { month }),
    ...(year && { year: year.toString() }),
  });
  
  const response = await fetch(`/data/news?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch news articles');
  }
  return response.json();
};
