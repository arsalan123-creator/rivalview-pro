export interface GartnerReview {
  id: string;
  title: string;
  rating: number;
  content: string;
  reviewer: string;
  date: string;
}

export interface GartnerReviewsResponse {
  data: GartnerReview[];
  total: number;
  page: number;
  page_size: number;
}

export const getGartnerBulkReviews = async (
  companyId: string,
  page: number = 1,
  pageSize: number = 10
): Promise<GartnerReviewsResponse> => {
  const params = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    page_size: pageSize.toString(),
  });
  
  const response = await fetch(`/data/gartner-bulk-reviews?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Gartner reviews');
  }
  return response.json();
};
