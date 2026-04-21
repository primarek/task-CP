import { THREAT_LEVEL_ORDER } from '@/pages/EntityMonitor/constants/threat-level';
import type { ThreatLevel } from '@/types';
import SignalThreatBadge from './SignalThreatBadge';

interface ThreatLevelFilterProps {
  selectedLevels: ThreatLevel[];
  onToggle: (level: ThreatLevel) => void;
}

const ThreatLevelFilter = ({ selectedLevels, onToggle }: ThreatLevelFilterProps) => {
  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-wide text-neutral-400">Threat Level</p>
      <div className="flex flex-wrap gap-2">
        {THREAT_LEVEL_ORDER.map((level) => {
          const selected = selectedLevels.includes(level);
          return (
            <button
              key={level}
              type="button"
              onClick={() => onToggle(level)}
              className={`rounded-full transition-opacity ${selected ? 'opacity-100' : 'opacity-45 hover:opacity-75'}`}
              aria-pressed={selected}
            >
              <SignalThreatBadge level={level} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ThreatLevelFilter;
