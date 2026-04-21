import { THREAT_LEVEL_LABELS, THREAT_LEVEL_ORDER } from '@/pages/EntityMonitor/constants/threat-level';
import type { EntityMonitorOverview } from '@/types';

interface ThreatLevelBreakdownProps {
  breakdown: EntityMonitorOverview['topThreatLevelBreakdown'];
}

const ThreatLevelBreakdown = ({ breakdown }: ThreatLevelBreakdownProps) => {
  const maxThreatCount = Math.max(...THREAT_LEVEL_ORDER.map((level) => breakdown[level]), 1);

  return (
    <div className="space-y-2">
      <h3 className="font-medium text-neutral-200">Threat Level Breakdown</h3>
      {THREAT_LEVEL_ORDER.map((level) => {
        const count = breakdown[level];
        const width = `${Math.max(8, (count / maxThreatCount) * 100)}%`;

        return (
          <div key={level} className="grid grid-cols-[140px_1fr_auto] items-center gap-2 text-xs">
            <span className="text-neutral-300">{THREAT_LEVEL_LABELS[level]}</span>
            <div className="h-2 overflow-hidden rounded bg-neutral-800">
              <div className="h-full rounded bg-blue-400" style={{ width }} />
            </div>
            <span className="text-neutral-200">{count}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ThreatLevelBreakdown;
