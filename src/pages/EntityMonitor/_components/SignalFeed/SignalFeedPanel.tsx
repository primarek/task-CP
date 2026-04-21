import { ENTITY_TYPE_LABELS } from '@/pages/EntityMonitor/constants/entity';
import SignalThreatBadge from './SignalThreatBadge';
import EntityTypeFilter from './EntityTypeFilter';
import ThreatLevelFilter from './ThreatLevelFilter';
import { formatDateTime } from '../../helpers/formatters';
import type { EntityType, Signal, ThreatLevel } from '@/types';

interface SignalFeedPanelProps {
  signals: Signal[];
  total: number;
  page: number;
  pageSize: number;
  threatFilters: ThreatLevel[];
  entityTypeFilters: EntityType[];
  onToggleThreatFilter: (level: ThreatLevel) => void;
  onToggleEntityTypeFilter: (type: EntityType) => void;
  onPageChange: (page: number) => void;
}

const SignalFeedPanel = ({
  signals,
  total,
  page,
  pageSize,
  threatFilters,
  entityTypeFilters,
  onToggleThreatFilter,
  onToggleEntityTypeFilter,
  onPageChange,
}: SignalFeedPanelProps) => {
  const threatRowBorderByLevel: Record<ThreatLevel, string> = {
    critical: 'border-l-red-500',
    high: 'border-l-orange-500',
    medium: 'border-l-amber-500',
    low: 'border-l-blue-500',
    informational: 'border-l-neutral-500',
  };

  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const handlePageChange = (nextPage: number) => onPageChange(Math.max(1, Math.min(totalPages, nextPage)));

  return (
    <section className="space-y-5 border border-neutral-800 bg-neutral-900 p-4">
      <h2 className="text-base font-semibold text-neutral-100">Signal Feed</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ThreatLevelFilter selectedLevels={threatFilters} onToggle={onToggleThreatFilter} />
        <EntityTypeFilter selectedTypes={entityTypeFilters} onToggle={onToggleEntityTypeFilter} />
      </div>

      {signals.length ? (
        <div className="space-y-3">
          {signals.map((signal) => (
            <article
              key={signal.id}
              className={`border border-neutral-800 border-l-4 ${threatRowBorderByLevel[signal.threatLevel]} bg-neutral-950/60`}
            >
              <div className="pt-3 px-4">
                <div>
                  <p className="font-semibold text-neutral-100 mb-1">
                    <span className="mr-2">{signal.title}</span> <SignalThreatBadge level={signal.threatLevel} />
                  </p>
                  <p className="text-xs uppercase tracking-wide text-neutral-400">
                    {signal.entityName} - {ENTITY_TYPE_LABELS[signal.entityType]}
                  </p>
                </div>

                <p className="text-sm text-neutral-300 py-4">{signal.summary}</p>
              </div>

              <div className="grid gap-2 text-xs text-neutral-400 sm:grid-cols-2 lg:grid-cols-4 mx-4 py-3 border-t border-neutral-800">
                <p>Detected: {formatDateTime(signal.detectedAt)}</p>
                <p>
                  Source: {signal.sourceDomain} ({signal.sourceCountry.name})
                </p>
                <p>Related articles: {signal.articleCount}</p>
                <p>Language: {signal.language}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-neutral-700 p-6 text-sm text-neutral-400">
          No signals match the current filters.
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-xs text-neutral-400">
          Showing {start}-{end} of {total}
        </p>

        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="border border-neutral-700 bg-neutral-900 px-3 py-1 text-xs text-neutral-200 disabled:opacity-40"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1}
          >
            Previous
          </button>
          <span className="text-xs text-neutral-300">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className="border border-neutral-700 bg-neutral-900 px-3 py-1 text-xs text-neutral-200 disabled:opacity-40"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignalFeedPanel;
