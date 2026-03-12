import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTHS, YEARS } from "@/constants/reviewPlaceholder";

type MonthYearSelectProps = {
  monthValue: string;
  yearValue: string;
  onMonthChange: (v: string) => void;
  onYearChange: (v: string) => void;
  monthPlaceholder?: string;
  yearPlaceholder?: string;
  disabled?: boolean;
};

export default function MonthYearSelect({
  monthValue,
  yearValue,
  onMonthChange,
  onYearChange,
  monthPlaceholder = "Month",
  yearPlaceholder = "Year",
  disabled = false,
}: MonthYearSelectProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Select
        value={monthValue}
        onValueChange={onMonthChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full h-10">
          <SelectValue placeholder={monthPlaceholder} />
        </SelectTrigger>
        <SelectContent>
          {MONTHS.map(month => (
            <SelectItem key={month} value={month}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={yearValue}
        onValueChange={onYearChange}
        disabled={disabled}
      >
        <SelectTrigger className="w-full h-10">
          <SelectValue placeholder={yearPlaceholder} />
        </SelectTrigger>
        <SelectContent>
          {YEARS.map(year => (
            <SelectItem key={year} value={year}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
