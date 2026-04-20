import { CircleQuestionMark } from 'lucide-react';

const SankeyHeader = () => {
  return (
    <header className="mb-4">
      <h3 className="text-base font-semibold text-neutral-100 flex items-center">
        Source countries and languages of articles
        <CircleQuestionMark className="ml-2 h-4 w-4 text-neutral-400" />
      </h3>
    </header>
  );
};

export default SankeyHeader;
