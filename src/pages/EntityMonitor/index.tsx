import { useMemo } from 'react';

import EntityActivityPanel from './_components/EntityActivity/EntityActivityPanel';
import OverviewPanel from './_components/OverviewPanel/OverviewPanel';
import SignalFeedPanel from './_components/SignalFeed/SignalFeedPanel';
import { useEntitiesTrend } from './hooks/useEntitiesTrend';
import { useOverview } from './hooks/useOverview';
import { useSignalsFeed } from './hooks/useSignalsFeed';

const DATE_RANGE = {
  from: '2026-02-01',
  to: '2026-02-28',
};

const PAGE_SIZE = 10;
const PANEL_MIN_HEIGHT_CLASS = 'min-h-[220px]';
const ACTIVITY_PANEL_MIN_HEIGHT_CLASS = 'min-h-[360px]';
const SIGNAL_FEED_MIN_HEIGHT_CLASS = 'min-h-[420px]';

const EntityMonitorPage = () => {
  const { overview, overviewLoading, overviewError } = useOverview({
    dateFrom: DATE_RANGE.from,
    dateTo: DATE_RANGE.to,
  });
  const {
    entities,
    entitiesLoading,
    entitiesError,
    selectedEntityId,
    setSelectedEntityId,
    trend,
    trendLoading,
    trendError,
  } = useEntitiesTrend();
  const {
    signals,
    signalsTotal,
    signalsPage,
    setSignalsPage,
    threatFilters,
    entityTypeFilters,
    signalsLoading,
    signalsError,
    toggleThreatFilter,
    toggleEntityTypeFilter,
  } = useSignalsFeed({ pageSize: PAGE_SIZE });

  const activityPanel = useMemo(() => {
    if (entitiesLoading) {
      return (
        <div
          className={`border border-neutral-800 bg-neutral-900 p-6 text-sm text-neutral-300 ${ACTIVITY_PANEL_MIN_HEIGHT_CLASS}`}
        >
          Loading entities...
        </div>
      );
    }

    if (entitiesError) {
      return (
        <div
          className={`border border-red-900 bg-red-950/30 p-6 text-sm text-red-300 ${ACTIVITY_PANEL_MIN_HEIGHT_CLASS}`}
        >
          {entitiesError}
        </div>
      );
    }

    if (!entities.length) {
      return (
        <div
          className={`border border-dashed border-neutral-700 p-6 text-sm text-neutral-400 ${ACTIVITY_PANEL_MIN_HEIGHT_CLASS}`}
        >
          No entities available.
        </div>
      );
    }

    return (
      <EntityActivityPanel
        entities={entities}
        selectedEntityId={selectedEntityId}
        onSelectEntity={setSelectedEntityId}
        trend={trend}
        isTrendLoading={trendLoading}
        trendError={trendError}
      />
    );
  }, [entities, entitiesError, entitiesLoading, selectedEntityId, trend, trendError, trendLoading]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <main className="mx-auto max-w-7xl space-y-10 px-4 py-8">
        <header className="mb-10">
          <h1 className="text-2xl font-semibold mb-2">Entity Monitor</h1>
          <p className="text-sm text-neutral-400">
            Monitor high-priority entities and triage threat signals across the active period.
          </p>
        </header>

        {overviewLoading ? (
          <div
            className={`border border-neutral-800 bg-neutral-900 p-6 text-sm text-neutral-300 ${PANEL_MIN_HEIGHT_CLASS}`}
          >
            Loading overview...
          </div>
        ) : overviewError ? (
          <div className={`border border-red-900 bg-red-950/30 p-6 text-sm text-red-300 ${PANEL_MIN_HEIGHT_CLASS}`}>
            {overviewError}
          </div>
        ) : overview ? (
          <OverviewPanel overview={overview} />
        ) : (
          <div
            className={`border border-dashed border-neutral-700 p-6 text-sm text-neutral-400 ${PANEL_MIN_HEIGHT_CLASS}`}
          >
            No overview data available.
          </div>
        )}

        {activityPanel}

        {signalsLoading ? (
          <div
            className={`border border-neutral-800 bg-neutral-900 p-6 text-sm text-neutral-300 ${SIGNAL_FEED_MIN_HEIGHT_CLASS}`}
          >
            Loading signal feed...
          </div>
        ) : signalsError ? (
          <div
            className={`border border-red-900 bg-red-950/30 p-6 text-sm text-red-300 ${SIGNAL_FEED_MIN_HEIGHT_CLASS}`}
          >
            {signalsError}
          </div>
        ) : (
          <SignalFeedPanel
            signals={signals}
            total={signalsTotal}
            page={signalsPage}
            pageSize={PAGE_SIZE}
            threatFilters={threatFilters}
            entityTypeFilters={entityTypeFilters}
            onToggleThreatFilter={toggleThreatFilter}
            onToggleEntityTypeFilter={toggleEntityTypeFilter}
            onPageChange={setSignalsPage}
          />
        )}
      </main>
    </div>
  );
};

export default EntityMonitorPage;
