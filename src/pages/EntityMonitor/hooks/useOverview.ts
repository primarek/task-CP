import { useEffect, useState } from 'react';

import { fetchEntityMonitorOverview } from '@/api/mock';
import type { EntityMonitorOverview } from '@/types';

interface UseOverviewParams {
  dateFrom: string;
  dateTo: string;
}

export const useOverview = ({ dateFrom, dateTo }: UseOverviewParams) => {
  const [overview, setOverview] = useState<EntityMonitorOverview | null>(null);
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [overviewError, setOverviewError] = useState<string | null>(null);

  useEffect(() => {
    const loadOverview = async () => {
      setOverviewLoading(true);
      setOverviewError(null);
      try {
        const response = await fetchEntityMonitorOverview(dateFrom, dateTo);
        setOverview(response);
      } catch {
        setOverviewError('Unable to load overview metrics.');
      } finally {
        setOverviewLoading(false);
      }
    };

    void loadOverview();
  }, [dateFrom, dateTo]);

  return { overview, overviewLoading, overviewError };
};

