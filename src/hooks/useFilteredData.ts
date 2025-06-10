import { useState, useMemo } from 'react';
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export function useFilteredData<T>(
  data: T[],
  options: FilterOption[],
  filterFn: (item: T, selectedOptions: string[]) => boolean
) {
  // Creeer een state voor de geselecteerde filters
  const [selectedFilters, setSelectedFilters] = useState<Record<string, Checked>>(
    Object.fromEntries(options.map(option => [option.id, false]))
  );

  // Toggle een specifieke filter
  const toggleFilter = (id: string, checked: Checked) => {
    setSelectedFilters(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  // Krijg de actieve filters op basis van de geselecteerde filters
  const activeFilters = useMemo(() => 
    Object.entries(selectedFilters)
      .filter(([_, isChecked]) => isChecked)
      .map(([id]) => options.find(opt => opt.id === id)?.value || ''),
    [selectedFilters, options]
  );

  // Filter de data
  const filteredData = useMemo(() => {
    // Als er geen actieve filters zijn, retourneer de originele data
    if (activeFilters.length === 0) return data;

    // Anders pas de aangepaste filterfunctie toe
    return data.filter(item => filterFn(item, activeFilters));
  }, [data, activeFilters, filterFn]);

  return {
    filteredData,
    selectedFilters,
    toggleFilter,
    filterOptions: options
  };
}