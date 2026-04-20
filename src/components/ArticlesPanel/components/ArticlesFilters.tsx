import { useMemo } from 'react';

import type { NewsArticle } from '@/types';
import { Select, SelectItem } from '@/components/ui/Select';
import type { ArticleFilters } from '../types';

interface ArticlesFiltersProps {
  articles: NewsArticle[];
  filters: ArticleFilters;
  onFiltersChange: (next: ArticleFilters) => void;
}

const ArticlesFilters = ({ articles, filters, onFiltersChange }: ArticlesFiltersProps) => {
  const hasActiveFilters = Boolean(filters.search || filters.domain || filters.sourceCountryCode || filters.language);

  const options = useMemo(() => {
    const domains = Array.from(new Set(articles.map((article) => article.domain))).sort((a, b) => a.localeCompare(b));
    const sourceCountries = Array.from(new Set(articles.map((article) => article.sourceCountry.code)))
      .map((code) => {
        const item = articles.find((article) => article.sourceCountry.code === code);
        return item?.sourceCountry;
      })
      .filter((country): country is NonNullable<typeof country> => Boolean(country))
      .sort((a, b) => a.name.localeCompare(b.name));
    const languages = Array.from(new Set(articles.map((article) => article.language))).sort((a, b) =>
      a.localeCompare(b),
    );

    return { domains, sourceCountries, languages };
  }, [articles]);

  return (
    <>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <input
          type="text"
          id="search"
          name="search"
          value={filters.search}
          onChange={(event) => onFiltersChange({ ...filters, search: event.target.value })}
          placeholder="Search..."
          className="mt-1 w-full border-b border-neutral-700 bg-transparent px-3 py-2 text-sm text-neutral-300 outline-none placeholder:text-neutral-500"
        />

        <Select
          value={filters.domain}
          onValueChange={(value) => onFiltersChange({ ...filters, domain: value })}
          placeholder="Select domain"
          ariaLabel="Domain"
          triggerClassName="border-b border-neutral-700"
          contentClassName="min-w-[150px]"
        >
          {options.domains.map((domain) => (
            <SelectItem key={domain} value={domain}>
              {domain}
            </SelectItem>
          ))}
        </Select>

        <Select
          value={filters.sourceCountryCode}
          onValueChange={(value) => onFiltersChange({ ...filters, sourceCountryCode: value })}
          placeholder="Select country"
          ariaLabel="Source country"
          triggerClassName="border-b border-neutral-700"
          contentClassName="min-w-[150px]"
        >
          {options.sourceCountries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              {country.name}
            </SelectItem>
          ))}
        </Select>

        <Select
          value={filters.language}
          onValueChange={(value) => onFiltersChange({ ...filters, language: value })}
          placeholder="Select language"
          ariaLabel="Language"
          triggerClassName="border-b border-neutral-700"
          contentClassName="min-w-[150px]"
        >
          {options.languages.map((language) => (
            <SelectItem key={language} value={language}>
              {language}
            </SelectItem>
          ))}
        </Select>
      </div>

      {hasActiveFilters && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => onFiltersChange({ search: '', domain: '', sourceCountryCode: '', language: '' })}
            className="text-xs uppercase text-neutral-400 transition hover:text-neutral-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
};

export default ArticlesFilters;
