import type { NewsArticle } from '@/types';

export interface ArticleFilters {
  search: string;
  domain: string;
  sourceCountryCode: string;
  language: string;
}

export interface ArticlesPanelProps {
  articles: NewsArticle[];
  filters: ArticleFilters;
  onFiltersChange: (next: ArticleFilters) => void;
  dateRangeLabel: string;
}
