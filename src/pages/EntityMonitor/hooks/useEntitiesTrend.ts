import { useEffect, useState } from 'react';

import { fetchEntities, fetchEntityTrend } from '@/api/mock';
import type { Entity, EntityTrendResponse } from '@/types';

export const useEntitiesTrend = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [entitiesLoading, setEntitiesLoading] = useState(true);
  const [entitiesError, setEntitiesError] = useState<string | null>(null);
  const [selectedEntityId, setSelectedEntityId] = useState('');

  const [trend, setTrend] = useState<EntityTrendResponse | null>(null);
  const [trendLoading, setTrendLoading] = useState(false);
  const [trendError, setTrendError] = useState<string | null>(null);

  useEffect(() => {
    const loadEntities = async () => {
      setEntitiesLoading(true);
      setEntitiesError(null);
      try {
        const response = await fetchEntities();
        setEntities(response);
        if (response.length > 0) {
          setSelectedEntityId((current) => current || response[0].id);
        }
      } catch {
        setEntitiesError('Unable to load tracked entities.');
      } finally {
        setEntitiesLoading(false);
      }
    };

    void loadEntities();
  }, []);

  useEffect(() => {
    if (!selectedEntityId) {
      setTrend(null);
      return;
    }

    const loadTrend = async () => {
      setTrendLoading(true);
      setTrendError(null);
      try {
        const response = await fetchEntityTrend(selectedEntityId);
        setTrend(response);
      } catch {
        setTrendError('Unable to load entity trend.');
      } finally {
        setTrendLoading(false);
      }
    };

    void loadTrend();
  }, [selectedEntityId]);

  return {
    entities,
    entitiesLoading,
    entitiesError,
    selectedEntityId,
    setSelectedEntityId,
    trend,
    trendLoading,
    trendError,
  };
};

