import { useMemo } from 'react';

import { formatDate } from '../../helpers/formatters';
import type { EntityTrendResponse } from '@/types';

interface EntityTrendChartProps {
  trend: EntityTrendResponse | null;
  isLoading: boolean;
  error: string | null;
}

const EntityTrendChart = ({ trend, isLoading, error }: EntityTrendChartProps) => {
  const mentionPoints = useMemo(() => {
    if (!trend?.dataPoints.length) return '';

    return trend.dataPoints
      .map((point, index) => {
        const x = (index / (trend.dataPoints.length - 1 || 1)) * 100;
        const y = 100 - (Math.min(point.mentionCount, 85) / 85) * 100;
        return `${x},${y}`;
      })
      .join(' ');
  }, [trend]);

  const sentimentPoints = useMemo(() => {
    if (!trend?.dataPoints.length) return '';

    return trend.dataPoints
      .map((point, index) => {
        const x = (index / (trend.dataPoints.length - 1 || 1)) * 100;
        const clampedSentiment = Math.max(-3, Math.min(1, point.sentimentScore));
        const normalizedSentiment = (clampedSentiment + 3) / 4;
        const y = 100 - normalizedSentiment * 100;
        return `${x},${y}`;
      })
      .join(' ');
  }, [trend]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex items-center gap-4 mb-2">
          {isLoading ? (
            <>
              <div className="h-4 w-40 animate-pulse rounded bg-neutral-800" />
              <div className="h-3 w-24 animate-pulse rounded bg-neutral-800" />
            </>
          ) : (
            <>
              <h3 className="text-sm font-semibold text-neutral-100">{trend?.entity.name ?? 'No entity selected'}</h3>
              {trend ? <p className="text-xs text-neutral-300">Avg sentiment: {trend.averageSentiment}</p> : null}
            </>
          )}
        </div>
        <p className="text-xs text-neutral-400">30-day mentions and sentiment</p>
      </div>

      {isLoading ? (
        <div className="flex h-48 w-full items-center justify-center border border-neutral-800 bg-neutral-900">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-500 border-t-blue-400" />
        </div>
      ) : error ? (
        <div className="border border-red-900 bg-red-950/30 p-6 text-sm text-red-300">{error}</div>
      ) : trend?.dataPoints.length ? (
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-xs text-neutral-300">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-blue-400" /> Mentions
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-purple-400" /> Sentiment
            </span>
          </div>
          <div className="h-48 w-full border border-neutral-800 bg-neutral-900 p-3">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
              <polyline fill="none" stroke="#60a5fa" strokeWidth="1.8" points={mentionPoints} />
              <polyline fill="none" stroke="#c084fc" strokeWidth="1.8" points={sentimentPoints} />
            </svg>
          </div>

          <div className="flex items-center gap-8 text-sm text-neutral-300">
            <p>
              Period: {formatDate(trend.dataPoints[0].timestamp)} -{' '}
              {formatDate(trend.dataPoints[trend.dataPoints.length - 1].timestamp)}
            </p>
            <p>Latest sentiment: {trend.dataPoints[trend.dataPoints.length - 1].sentimentScore}</p>
            <p>Peak mentions: {formatDate(trend.peakMentionDate)}</p>
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-neutral-700 p-6 text-sm text-neutral-400">
          No trend data available.
        </div>
      )}
    </div>
  );
};

export default EntityTrendChart;
