import { CircleQuestionMark } from 'lucide-react';

interface Props {
  dateRangeLabel: string;
}

const ArticlesHeader = ({ dateRangeLabel }: Props) => {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <h3 className="text-base font-semibold text-neutral-100 flex items-center">
        News articles
        <CircleQuestionMark className="ml-2 h-4 w-4 text-neutral-400" />
      </h3>
      <p className="text-xs text-neutral-400">{dateRangeLabel}</p>
    </div>
  );
};

export default ArticlesHeader;
