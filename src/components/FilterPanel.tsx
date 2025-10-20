import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterPanelProps {
  month?: string;
  year?: number;
  onMonthChange?: (month: string) => void;
  onYearChange?: (year: number) => void;
  showFilters?: boolean;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

export function FilterPanel({
  month,
  year,
  onMonthChange,
  onYearChange,
  showFilters = true,
}: FilterPanelProps) {
  if (!showFilters) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-text-secondary">Filter by:</span>
        <Select value={month} onValueChange={onMonthChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m} value={m.toLowerCase()}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={year?.toString()} onValueChange={(v) => onYearChange?.(parseInt(v))}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
