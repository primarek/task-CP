import type { ThreatLevel } from '@/types';

export const THREAT_LEVEL_ORDER: ThreatLevel[] = ['critical', 'high', 'medium', 'low', 'informational'];

export const THREAT_LEVEL_LABELS: Record<ThreatLevel, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
  informational: 'Informational',
};

export const THREAT_LEVEL_STYLES: Record<ThreatLevel, string> = {
  critical: 'border-red-500/50 bg-red-600/25 text-red-100',
  high: 'border-orange-500/50 bg-orange-600/20 text-orange-100',
  medium: 'border-amber-500/50 bg-amber-600/20 text-amber-100',
  low: 'border-blue-500/40 bg-blue-600/20 text-blue-100',
  informational: 'border-neutral-500/40 bg-neutral-700/40 text-neutral-200',
};
