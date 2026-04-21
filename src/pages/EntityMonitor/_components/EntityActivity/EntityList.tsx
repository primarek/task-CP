import type { Entity } from '@/types';
import { StarIcon } from 'lucide-react';

interface EntityListProps {
  entities: Entity[];
  selectedEntityId: string;
  onSelectEntity: (id: string) => void;
}

const EntityList = ({ entities, selectedEntityId, onSelectEntity }: EntityListProps) => {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-neutral-100 mb-4">Entity Activity</h2>
      <ul className="max-h-80 space-y-2 overflow-y-auto pr-1">
        {entities.map((entity) => {
          const isSelected = entity.id === selectedEntityId;

          return (
            <li key={entity.id}>
              <button
                type="button"
                onClick={() => onSelectEntity(entity.id)}
                className={`w-full border px-3 py-2 text-left ${
                  isSelected
                    ? 'border-blue-500 bg-blue-600/20 text-blue-100'
                    : 'border-neutral-800 bg-neutral-950/60 text-neutral-200 hover:bg-neutral-900'
                }`}
              >
                <p className="text-sm font-medium mb-1">{entity.name}</p>
                <p className="text-xs uppercase tracking-wide text-neutral-400 flex items-center gap-1">
                  {entity.watchlisted && <StarIcon className="w-3 h-3 shrink-0" />}
                  <span>{entity.type}</span>
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EntityList;
