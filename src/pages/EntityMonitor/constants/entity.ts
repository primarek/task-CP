import type { EntityType } from '@/types';

export const ENTITY_TYPE_LABELS: Record<EntityType, string> = {
  person: 'Person',
  organisation: 'Organisation',
  location: 'Location',
  topic: 'Topic',
  event: 'Event',
};

export const ENTITY_TYPE_ORDER: EntityType[] = ['person', 'organisation', 'location', 'topic', 'event'];
