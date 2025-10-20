export interface FirecrawlPage {
  id: string;
  url: string;
  title: string;
  content: string;
  crawled_at: string;
}

export interface FirecrawlResponse {
  data: FirecrawlPage[];
  total: number;
  page: number;
  page_size: number;
}

export const getFirecrawlPages = async (
  companyId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<FirecrawlResponse> => {
  const params = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    page_size: pageSize.toString(),
  });
  
  const response = await fetch(`/data/firecrawl-pages?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Firecrawl pages');
  }
  return response.json();
};
