import { THREAT_LEVEL_LABELS, THREAT_LEVEL_STYLES } from '@/pages/EntityMonitor/constants/threat-level';
import type { ThreatLevel } from '@/types';

interface SignalThreatBadgeProps {
  level: ThreatLevel;
}

const SignalThreatBadge = ({ level }: SignalThreatBadgeProps) => {
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-1 text-xs font-semibold uppercase ${THREAT_LEVEL_STYLES[level]}`}
    >
      {THREAT_LEVEL_LABELS[level]}
    </span>
  );
};

export default SignalThreatBadge;
