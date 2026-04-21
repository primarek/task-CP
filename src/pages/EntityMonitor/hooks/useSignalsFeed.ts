import { useEffect, useState } from 'react';

import { fetchSignals } from '@/api/mock';
import type { EntityType, Signal, ThreatLevel } from '@/types';

interface UseSignalsFeedParams {
  pageSize: number;
}

export const useSignalsFeed = ({ pageSize }: UseSignalsFeedParams) => {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [signalsTotal, setSignalsTotal] = useState(0);
  const [signalsPage, setSignalsPage] = useState(1);
  const [threatFilters, setThreatFilters] = useState<ThreatLevel[]>([]);
  const [entityTypeFilters, setEntityTypeFilters] = useState<EntityType[]>([]);
  const [signalsLoading, setSignalsLoading] = useState(true);
  const [signalsError, setSignalsError] = useState<string | null>(null);

  useEffect(() => {
    const loadSignals = async () => {
      setSignalsLoading(true);
      setSignalsError(null);
      try {
        const response = await fetchSignals({
          threatLevel: threatFilters,
          entityType: entityTypeFilters,
          page: signalsPage,
          pageSize,
        });
        setSignals(response.signals);
        setSignalsTotal(response.total);
      } catch {
        setSignalsError('Unable to load signal feed.');
      } finally {
        setSignalsLoading(false);
      }
    };

    void loadSignals();
  }, [entityTypeFilters, pageSize, signalsPage, threatFilters]);

  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(signalsTotal / pageSize));
    if (signalsPage > totalPages) {
      setSignalsPage(totalPages);
    }
  }, [pageSize, signalsPage, signalsTotal]);

  const toggleThreatFilter = (level: ThreatLevel) => {
    setSignalsPage(1);
    setThreatFilters((current) =>
      current.includes(level) ? current.filter((existingLevel) => existingLevel !== level) : [...current, level],
    );
  };

  const toggleEntityTypeFilter = (type: EntityType) => {
    setSignalsPage(1);
    setEntityTypeFilters((current) =>
      current.includes(type) ? current.filter((existingType) => existingType !== type) : [...current, type],
    );
  };

  return {
    signals,
    signalsTotal,
    signalsPage,
    setSignalsPage,
    threatFilters,
    entityTypeFilters,
    signalsLoading,
    signalsError,
    toggleThreatFilter,
    toggleEntityTypeFilter,
  };
};

