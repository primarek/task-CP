import OverviewMetricCard from './OverviewMetricCard';
import ThreatLevelBreakdown from './ThreatLevelBreakdown';
import type { OverviewMetricItem } from '../../types/overview';
import type { EntityMonitorOverview } from '@/types';

interface OverviewPanelProps {
  overview: EntityMonitorOverview;
}

const OverviewPanel = ({ overview }: OverviewPanelProps) => {
  const metricItems: OverviewMetricItem[] = [
    {
      label: 'Total Signals',
      value: overview.totalSignals,
      cardClassName: 'border border-neutral-800 bg-neutral-950/70 p-3',
      labelClassName: 'text-xs uppercase tracking-wide text-neutral-400',
      valueClassName: 'mt-1 text-2xl font-semibold text-neutral-100',
    },
    {
      label: 'Critical Signals',
      value: overview.criticalSignals,
      cardClassName: 'border border-red-900/50 bg-red-950/20 p-3',
      labelClassName: 'text-xs uppercase tracking-wide text-red-300',
      valueClassName: 'mt-1 text-2xl font-semibold text-red-100',
    },
    {
      label: 'New Entities',
      value: overview.newEntitiesSurfaced,
      cardClassName: 'border border-neutral-800 bg-neutral-950/70 p-3',
      labelClassName: 'text-xs uppercase tracking-wide text-neutral-400',
      valueClassName: 'mt-1 text-2xl font-semibold text-neutral-100',
    },
  ];

  return (
    <section className="space-y-5 border border-neutral-800 bg-neutral-900 p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-neutral-100">Overview</h2>
        <span className="text-xs">
          Period: {overview.periodStart} to {overview.periodEnd}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {metricItems.map((item) => (
          <OverviewMetricCard key={item.label} item={item} />
        ))}
      </div>

      <ThreatLevelBreakdown breakdown={overview.topThreatLevelBreakdown} />
    </section>
  );
};

export default OverviewPanel;
