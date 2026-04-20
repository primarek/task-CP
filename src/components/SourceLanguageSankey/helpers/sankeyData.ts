import type { SourceLanguageFlow } from '@/types';
import type { SankeyLink, SankeyNode } from '../types';

const palette = [
  '#4A63D9',
  '#22c55e',
  '#f97316',
  '#a855f7',
  '#06b6d4',
  '#ef4444',
  '#eab308',
  '#14b8a6',
  '#f43f5e',
  '#8b5cf6',
  '#84cc16',
  '#3b82f6',
  '#f59e0b',
  '#10b981',
  '#ec4899',
  '#6366f1',
];

const shiftHexColor = (hex: string, amount: number) => {
  const normalized = hex.replace('#', '');
  const safe = normalized.length === 6 ? normalized : '737373';
  const value = parseInt(safe, 16);
  const r = Math.max(0, Math.min(255, ((value >> 16) & 0xff) + amount));
  const g = Math.max(0, Math.min(255, ((value >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (value & 0xff) + amount));

  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

export const buildSankeyData = (flows: SourceLanguageFlow[]) => {
  const countryIds = Array.from(new Set(flows.map((flow) => flow.sourceCountry.name)));
  const languageIds = Array.from(new Set(flows.map((flow) => flow.language)));

  const nodes: SankeyNode[] = [...countryIds, ...languageIds].map((id) => ({ id }));
  const links: SankeyLink[] = flows.map((flow) => ({
    source: flow.sourceCountry.name,
    target: flow.language,
    value: flow.articleCount,
  }));

  return { nodes, links };
};

export const buildNodeColorMap = (nodes: SankeyNode[]) => {
  return new Map(nodes.map((node, index) => [String(node.id), palette[index % palette.length]]));
};

export const buildColoredLinks = (links: SankeyLink[], colorById: Map<string, string>) => {
  return links.map((link) => {
    const sourceColor = colorById.get(String(link.source)) ?? '#737373';

    return {
      ...link,
      startColor: sourceColor,
      endColor: shiftHexColor(sourceColor, 38),
    };
  });
};
