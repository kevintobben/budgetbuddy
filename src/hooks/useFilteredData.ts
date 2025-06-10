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
  
  // Voeg zoek functionaliteit toe
  const [searchTerm, setSearchTerm] = useState("");

  // Toggl een specifieke filter
  const toggleFilter = (id: string, checked: Checked) => {
    setSelectedFilters(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  // Krijg active filter values
  const activeFilters = useMemo(() => 
    Object.entries(selectedFilters)
      .filter(([, isChecked]) => isChecked)
      .map(([id]) => options.find(opt => opt.id === id)?.value || ''),
    [selectedFilters, options]
  );

  // Filter de data
  const filteredData = useMemo(() => {
    let filtered = data;
    
    if (activeFilters.length > 0) {
      filtered = filtered.filter(item => filterFn(item, activeFilters));
    }

    // Dan apply search term als het aanwezig is
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(item => {
        // Zoek in alle string properties van het item
        return Object.entries(item as Record<string, unknown>).some(([, value]) => {
          return typeof value === 'string' && value.toLowerCase().includes(searchLower);
        });
      });
    }
    
    return filtered;
  }, [data, activeFilters, filterFn, searchTerm]);

  return {
    filteredData,
    selectedFilters,
    toggleFilter,
    searchTerm,
    setSearchTerm,
    filterOptions: options
  };
}