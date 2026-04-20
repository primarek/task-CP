import { useEffect, useMemo, useState } from 'react';

import { fetchAvailableCountries, fetchNewsAnalytics, generateSummary } from '@/api/mock';
import ArticlesPanel from '@/components/ArticlesPanel/ArticlesPanel';
import InfluentialCountriesChart from '@/components/InfluentialCountriesChart/InfluentialCountriesChart';
import NewsTopBar from '@/components/NewsTopBar/NewsTopBar';
import SectionsSidebar from '@/components/SectionsSidebar';
import SourceLanguageSankey from '@/components/SourceLanguageSankey/SourceLanguageSankey';
import SummarySidebar from '@/components/SummarySidebar';
import type { Country, DataMode, NewsAnalyticsData } from '@/types';

const DATE_RANGE = {
  from: '2026-02-06',
  to: '2026-02-12',
  label: '06 Feb - 12 Feb',
};

const INITIAL_FILTERS = {
  search: '',
  domain: '',
  sourceCountryCode: '',
  language: '',
};

const NewsAnalyticsPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('');
  const [mode, setMode] = useState<DataMode>('news');
  const [analyticsData, setAnalyticsData] = useState<NewsAnalyticsData | null>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);
  const [analyticsError, setAnalyticsError] = useState<string | null>(null);

  const [summaryBody, setSummaryBody] = useState<string | null>(null);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const [articleFilters, setArticleFilters] = useState(INITIAL_FILTERS);

  useEffect(() => {
    async function loadCountries() {
      try {
        const availableCountries = await fetchAvailableCountries();
        setCountries(availableCountries);
        if (availableCountries.length > 0) {
          setSelectedCountryCode((current) => current || availableCountries[0].code);
        }
      } catch {
        setAnalyticsError('Unable to load countries at the moment.');
      }
    }

    void loadCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountryCode) return;

    async function loadAnalyticsData() {
      setIsLoadingAnalytics(true);
      setAnalyticsError(null);

      try {
        const response = await fetchNewsAnalytics(selectedCountryCode, mode, DATE_RANGE.from, DATE_RANGE.to);
        setAnalyticsData(response);
      } catch {
        setAnalyticsError('Unable to load analytics data.');
      } finally {
        setIsLoadingAnalytics(false);
      }
    }

    void loadAnalyticsData();
  }, [selectedCountryCode, mode]);

  const selectedCountryName = useMemo(
    () => countries.find((country) => country.code === selectedCountryCode)?.name ?? selectedCountryCode,
    [countries, selectedCountryCode],
  );

  async function handleGenerateSummary() {
    if (!selectedCountryCode) return;

    setIsGeneratingSummary(true);
    setSummaryError(null);

    try {
      const summary = await generateSummary(selectedCountryCode);
      setSummaryBody(summary.body);
    } catch {
      setSummaryError('Summary generation failed. Please try again.');
    } finally {
      setIsGeneratingSummary(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <NewsTopBar
        countries={countries}
        selectedCountryCode={selectedCountryCode}
        mode={mode}
        onCountryChange={setSelectedCountryCode}
        onModeChange={setMode}
      />

      <main className="mx-auto grid gap-4 py-10 lg:grid-cols-[300px_1fr_300px]">
        <SummarySidebar
          summaryBody={summaryBody}
          summaryError={summaryError}
          isGenerating={isGeneratingSummary}
          onGenerateSummary={handleGenerateSummary}
        />

        <section className="space-y-8">
          <div className="border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
            <p>
              Analytics coverage for <span className="font-semibold text-neutral-100">{selectedCountryName}</span> in{' '}
              {mode === 'news' ? 'News' : 'Social Media'} mode ({DATE_RANGE.label})
            </p>
          </div>

          {isLoadingAnalytics ? (
            <div className="border border-neutral-800 bg-neutral-900 p-6 text-sm text-neutral-300">
              Loading analytics data...
            </div>
          ) : analyticsError ? (
            <div className="border border-red-900 bg-red-950/30 p-6 text-sm text-red-300">{analyticsError}</div>
          ) : analyticsData ? (
            <>
              <InfluentialCountriesChart countries={analyticsData.topInfluentialCountries} />
              <SourceLanguageSankey flows={analyticsData.sourceLanguageFlows} />
              <ArticlesPanel
                articles={analyticsData.articles}
                filters={articleFilters}
                onFiltersChange={setArticleFilters}
                dateRangeLabel={DATE_RANGE.label}
              />
            </>
          ) : (
            <div className="border border-dashed border-neutral-700 bg-neutral-900 p-6 text-sm text-neutral-400">
              No analytics available.
            </div>
          )}
        </section>

        <SectionsSidebar />
      </main>
    </div>
  );
};

export default NewsAnalyticsPage;
