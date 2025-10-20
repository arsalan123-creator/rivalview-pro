export interface Company {
  id: string;
  name: string;
  logo?: string;
}

export const getCompanies = async (): Promise<Company[]> => {
  const response = await fetch('/data/companies');
  if (!response.ok) {
    throw new Error('Failed to fetch companies');
  }
  return response.json();
};
