import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { DataTable } from "@/components/DataTable";
import { CompanySelector } from "@/components/CompanySelector";
import { FilterPanel } from "@/components/FilterPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCompanies, Company } from "@/lib/api/companies";
import { getLinkedInPosts } from "@/lib/api/linkedin";
import { getNewsArticles } from "@/lib/api/news";
import { getG2BulkReviews } from "@/lib/api/g2-reviews";
import { getGartnerBulkReviews } from "@/lib/api/gartner-reviews";
import { getFirecrawlPages } from "@/lib/api/firecrawl";

export default function Companies() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [month, setMonth] = useState<string>("october");
  const [year, setYear] = useState<number>(2025);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("linkedin");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
        if (data.length > 0) {
          setSelectedCompany(data[0]);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany) {
      fetchData();
    }
  }, [selectedCompany, activeTab, page, month, year]);

  const fetchData = async () => {
    if (!selectedCompany) return;

    setLoading(true);
    try {
      let response;
      switch (activeTab) {
        case "linkedin":
          response = await getLinkedInPosts(selectedCompany.id, page, 10, month, year);
          break;
        case "news":
          response = await getNewsArticles(selectedCompany.id, page, 10, month, year);
          break;
        case "g2":
          response = await getG2BulkReviews(selectedCompany.id, page, 10);
          break;
        case "gartner":
          response = await getGartnerBulkReviews(selectedCompany.id, page, 10);
          break;
        case "firecrawl":
          response = await getFirecrawlPages(selectedCompany.id, page, 10);
          break;
        default:
          response = { data: [], total: 0 };
      }
      setData(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const getColumns = () => {
    switch (activeTab) {
      case "linkedin":
        return [
          { key: "date", label: "Date" },
          { key: "content", label: "Content", render: (value: string) => (
            <span className="line-clamp-2">{value}</span>
          )},
        ];
      case "news":
        return [
          { key: "date", label: "Date" },
          { key: "title", label: "Title" },
          { key: "source", label: "Source" },
        ];
      case "g2":
      case "gartner":
        return [
          { key: "date", label: "Date" },
          { key: "title", label: "Title" },
          { key: "rating", label: "Rating" },
          { key: "reviewer", label: "Reviewer" },
        ];
      case "firecrawl":
        return [
          { key: "crawled_at", label: "Crawled At" },
          { key: "title", label: "Title" },
          { key: "url", label: "URL" },
        ];
      default:
        return [];
    }
  };

  const showFilters = activeTab === "linkedin" || activeTab === "news";

  return (
    <div className="flex h-screen flex-col">
      <Header title="Companies" />

      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Company Data</h2>
            <CompanySelector
              companies={companies}
              selectedCompany={selectedCompany}
              onSelect={(company) => {
                setSelectedCompany(company);
                setPage(1);
              }}
            />
          </div>

          <Tabs value={activeTab} onValueChange={(value) => {
            setActiveTab(value);
            setPage(1);
          }}>
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="g2">G2 Reviews</TabsTrigger>
                <TabsTrigger value="gartner">Gartner Reviews</TabsTrigger>
                <TabsTrigger value="firecrawl">FireCrawl</TabsTrigger>
              </TabsList>
              
              <FilterPanel
                month={month}
                year={year}
                onMonthChange={(m) => {
                  setMonth(m);
                  setPage(1);
                }}
                onYearChange={(y) => {
                  setYear(y);
                  setPage(1);
                }}
                showFilters={showFilters}
              />
            </div>

            <TabsContent value={activeTab} className="mt-6">
              <DataTable
                columns={getColumns()}
                data={data}
                page={page}
                pageSize={10}
                total={total}
                onPageChange={setPage}
                loading={loading}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
