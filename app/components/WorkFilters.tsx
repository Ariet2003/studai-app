'use client';

import { 
  AdjustmentsHorizontalIcon, 
  DocumentTextIcon,
  DocumentDuplicateIcon,
  LanguageIcon,
  CalendarIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline';
import { useState } from 'react';

interface WorkFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOption) => void;
}

export interface FilterOptions {
  type: string;
  pageRange: string;
  language: string;
}

export type SortOption = 'newest' | 'oldest';

const workTypes = ['Все типы', 'Реферат', 'СРС', 'Доклад', 'Курсовая'];
const pageRanges = ['Все страницы', 'до 10', '10-20', '20-30', '30 и более'];
const languages = ['Все языки', 'Русский', 'Кыргызский', 'Английский'];

export default function WorkFilters({ onFilterChange, onSortChange }: WorkFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('Все типы');
  const [selectedPages, setSelectedPages] = useState('Все страницы');
  const [selectedLanguage, setSelectedLanguage] = useState('Все языки');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const handleFilterChange = (
    type: string = selectedType,
    pages: string = selectedPages,
    language: string = selectedLanguage
  ) => {
    onFilterChange({
      type: type === 'Все типы' ? '' : type,
      pageRange: pages === 'Все страницы' ? '' : pages,
      language: language === 'Все языки' ? '' : language,
    });
  };

  const FilterButton = ({ 
    icon: Icon, 
    options, 
    value, 
    onChange, 
    label 
  }: { 
    icon: any, 
    options: string[], 
    value: string, 
    onChange: (value: string) => void,
    label: string 
  }) => (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-4 py-2 bg-[#181F38] text-gray-400 rounded-lg
                   hover:bg-[#242B44] hover:text-white transition-all duration-300"
      >
        <Icon className="h-5 w-5" />
        <span>{value}</span>
        <ChevronDownIcon className="h-4 w-4 ml-1 transform group-hover:rotate-180 transition-transform duration-300" />
      </button>
      <div className="absolute z-10 w-48 mt-2 bg-[#181F38] border border-gray-700 rounded-lg shadow-xl 
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                    transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
        <div className="py-1">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                handleFilterChange(
                  label === 'Тип' ? option : selectedType,
                  label === 'Страницы' ? option : selectedPages,
                  label === 'Язык' ? option : selectedLanguage
                );
              }}
              className={`block w-full text-left px-4 py-2 text-sm ${
                value === option 
                  ? 'text-[#454CEE] bg-[#242B44]' 
                  : 'text-gray-400 hover:text-white hover:bg-[#242B44]'
              } transition-colors duration-200`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <FilterButton
          icon={DocumentTextIcon}
          options={workTypes}
          value={selectedType}
          onChange={setSelectedType}
          label="Тип"
        />
        <FilterButton
          icon={DocumentDuplicateIcon}
          options={pageRanges}
          value={selectedPages}
          onChange={setSelectedPages}
          label="Страницы"
        />
        <FilterButton
          icon={LanguageIcon}
          options={languages}
          value={selectedLanguage}
          onChange={setSelectedLanguage}
          label="Язык"
        />
        <button
          onClick={() => {
            const newSort = sortBy === 'newest' ? 'oldest' : 'newest';
            setSortBy(newSort);
            onSortChange(newSort);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#181F38] text-gray-400 rounded-lg
                     hover:bg-[#242B44] hover:text-white transition-all duration-300"
        >
          <CalendarIcon className="h-5 w-5" />
          <span>{sortBy === 'newest' ? 'Сначала новые' : 'Сначала старые'}</span>
        </button>
      </div>
    </div>
  );
} 