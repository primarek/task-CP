import { ENTITY_TYPE_LABELS, ENTITY_TYPE_ORDER } from '@/pages/EntityMonitor/constants/entity';
import type { EntityType } from '@/types';

interface EntityTypeFilterProps {
  selectedTypes: EntityType[];
  onToggle: (type: EntityType) => void;
}

const EntityTypeFilter = ({ selectedTypes, onToggle }: EntityTypeFilterProps) => {
  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-wide text-neutral-400">Entity Type</p>
      <div className="flex flex-wrap gap-2">
        {ENTITY_TYPE_ORDER.map((type) => {
          const selected = selectedTypes.includes(type);
          return (
            <button
              key={type}
              type="button"
              onClick={() => onToggle(type)}
              className={`border px-2 py-1 text-xs ${
                selected
                  ? 'border-blue-500 bg-blue-600/20 text-blue-100'
                  : 'border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-neutral-600'
              }`}
            >
              {ENTITY_TYPE_LABELS[type]}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EntityTypeFilter;
