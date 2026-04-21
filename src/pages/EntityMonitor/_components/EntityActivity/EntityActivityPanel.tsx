import type { Entity, EntityTrendResponse } from '@/types';
import EntityList from './EntityList';
import EntityTrendChart from './EntityTrendChart';

interface EntityActivityPanelProps {
  entities: Entity[];
  selectedEntityId: string;
  onSelectEntity: (id: string) => void;
  trend: EntityTrendResponse | null;
  isTrendLoading: boolean;
  trendError: string | null;
}

const EntityActivityPanel = ({
  entities,
  selectedEntityId,
  onSelectEntity,
  trend,
  isTrendLoading,
  trendError,
}: EntityActivityPanelProps) => {
  return (
    <section className="grid gap-4 border border-neutral-800 p-4 lg:grid-cols-[280px_1fr]">
      <EntityList entities={entities} selectedEntityId={selectedEntityId} onSelectEntity={onSelectEntity} />
      <EntityTrendChart trend={trend} isLoading={isTrendLoading} error={trendError} />
    </section>
  );
};

export default EntityActivityPanel;
