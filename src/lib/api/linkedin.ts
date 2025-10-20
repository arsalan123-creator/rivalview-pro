export interface LinkedInPost {
  id: string;
  content: string;
  date: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface LinkedInResponse {
  data: LinkedInPost[];
  total: number;
  page: number;
  page_size: number;
}

export const getLinkedInPosts = async (
  companyId: string,
  page: number = 1,
  pageSize: number = 10,
  month?: string,
  year?: number
): Promise<LinkedInResponse> => {
  const params = new URLSearchParams({
    company_id: companyId,
    page: page.toString(),
    page_size: pageSize.toString(),
    ...(month && { month }),
    ...(year && { year: year.toString() }),
  });
  
  const response = await fetch(`/data/linkedin?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch LinkedIn posts');
  }
  return response.json();
};
