import { formatCompactNumber } from '../../helpers/formatters';
import type { OverviewMetricItem } from '../../types/overview';

interface OverviewMetricCardProps {
  item: OverviewMetricItem;
}

const OverviewMetricCard = ({ item }: OverviewMetricCardProps) => {
  return (
    <article className={item.cardClassName}>
      <p className={item.labelClassName}>{item.label}</p>
      <p className={item.valueClassName}>{formatCompactNumber(item.value)}</p>
    </article>
  );
};

export default OverviewMetricCard;
