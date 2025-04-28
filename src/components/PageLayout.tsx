import React from "react";
import { Separator } from "@/components/ui/separator";
// import { DateFilter } from "@/components/DateFilter";
import { DatePickerWithRange } from "@/components/DatePickerWithRange"

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  showDateFilters?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ title, children, showDateFilters }) => {
  return (
    <div className="p-8 max-w-screen-xl mx-auto space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        {showDateFilters && 
        <DatePickerWithRange />
        }
      </div>
      <Separator />

      <div>
        {children}
      </div>
    </div>
  );
}

export default PageLayout;
