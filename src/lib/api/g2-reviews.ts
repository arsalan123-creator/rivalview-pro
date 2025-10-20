export interface G2Review {
  id: string;
  title: string;
  rating: number;
  content: string;
  reviewer: string;
  date: string;
}

export interface G2ReviewsResponse {
  data: G2Review[];
  total: number;
  page: number;
  page_size: number;
}

export const getG2BulkReviews = async (
  companyId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<G2ReviewsResponse> => {
  const params = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    page_size: pageSize.toString(),
  });
  
  const response = await fetch(`/data/g2-bulk-reviews?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch G2 reviews');
  }
  return response.json();
};
