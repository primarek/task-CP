import { useEffect, useMemo, useState } from 'react';

import type { ArticlesPanelProps } from './types';
import ArticlesFilters from './components/ArticlesFilters';
import ArticlesHeader from './components/ArticlesHeader';
import ArticlesPagination from './components/ArticlesPagination';
import ArticlesTable from './components/ArticlesTable';

const PAGE_SIZE = 10;

const ArticlesPanel = ({ articles, filters, onFiltersChange, dateRangeLabel }: ArticlesPanelProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(() => {
    const normalizedSearch = filters.search.trim().toLowerCase();
    return articles.filter((article) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        article.title.toLowerCase().includes(normalizedSearch) ||
        article.domain.toLowerCase().includes(normalizedSearch);
      const matchesDomain = !filters.domain || article.domain === filters.domain;
      const matchesCountry = !filters.sourceCountryCode || article.sourceCountry.code === filters.sourceCountryCode;
      const matchesLanguage = !filters.language || article.language === filters.language;
      return matchesSearch && matchesDomain && matchesCountry && matchesLanguage;
    });
  }, [articles, filters]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage(1);
  }, [filters.search, filters.domain, filters.sourceCountryCode, filters.language]);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredArticles.slice(start, start + PAGE_SIZE);
  }, [filteredArticles, currentPage]);

  return (
    <section>
      <ArticlesHeader dateRangeLabel={dateRangeLabel} />

      <ArticlesFilters articles={articles} filters={filters} onFiltersChange={onFiltersChange} />

      <ArticlesTable articles={paginatedArticles} />

      <ArticlesPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredArticles.length}
        pageSize={PAGE_SIZE}
        onPreviousPage={() => setCurrentPage((page) => Math.max(1, page - 1))}
        onNextPage={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
      />
    </section>
  );
};

export default ArticlesPanel;
