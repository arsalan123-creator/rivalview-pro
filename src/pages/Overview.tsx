import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/MetricCard";
import { DataTable } from "@/components/DataTable";
import { CompanySelector } from "@/components/CompanySelector";
import { Building2, TrendingUp, FileText } from "lucide-react";
import { getCompanies, Company } from "@/lib/api/companies";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilterPanel } from "@/components/FilterPanel";

export default function Overview() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState<string>("october");
  const [year, setYear] = useState<number>(2025);
  const [page, setPage] = useState(1);

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
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const mockData = [
    { id: 1, company: "Company 1", metric1: "Text", metric2: "Text" },
    { id: 2, company: "Starbucks", metric1: "Text", metric2: "Text" },
    { id: 3, company: "McDonald's", metric1: "Text", metric2: "Text" },
    { id: 4, company: "L'Oréal", metric1: "Text", metric2: "Text" },
    { id: 5, company: "Apple", metric1: "Text", metric2: "Text" },
  ];

  const columns = [
    { key: "company", label: "Company" },
    { key: "metric1", label: "Metric 1" },
    { key: "metric2", label: "Metric 2" },
  ];

  return (
    <div className="flex h-screen flex-col">
      <Header title="Overview" showDownload onDownload={() => console.log("Download")} />

      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Metrics Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <MetricCard
              title="Metadata"
              value="150"
              icon={Building2}
            />
            <MetricCard
              title="Metadata"
              value="152"
              icon={TrendingUp}
            />
            <MetricCard
              title="Meta"
              value="152"
              icon={FileText}
            />
          </div>

          {/* Companies Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">List of companies</h2>
              <CompanySelector
                companies={companies}
                selectedCompany={selectedCompany}
                onSelect={setSelectedCompany}
              />
            </div>

            <Tabs defaultValue="all" className="w-full">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="all">All companies</TabsTrigger>
                  <TabsTrigger value="starred">Starred</TabsTrigger>
                </TabsList>
                <FilterPanel
                  month={month}
                  year={year}
                  onMonthChange={setMonth}
                  onYearChange={setYear}
                  showFilters={false}
                />
              </div>

              <TabsContent value="all" className="mt-6">
                <DataTable
                  columns={columns}
                  data={mockData}
                  page={page}
                  pageSize={10}
                  total={mockData.length}
                  onPageChange={setPage}
                  loading={loading}
                />
              </TabsContent>

              <TabsContent value="starred" className="mt-6">
                <DataTable
                  columns={columns}
                  data={[]}
                  page={page}
                  pageSize={10}
                  total={0}
                  onPageChange={setPage}
                  loading={false}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
