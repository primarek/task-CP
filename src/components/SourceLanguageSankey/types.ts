export interface SankeyNode {
  id: string;
}

export interface SankeyLink {
  source: string;
  target: string;
  value: number;
}

export interface ColoredSankeyLink extends SankeyLink {
  startColor: string;
  endColor: string;
}
