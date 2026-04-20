import type { SourceLanguageFlow } from '@/types';

import SankeyChart from './components/SankeyChart';
import SankeyHeader from './components/SankeyHeader';

interface Props {
  flows: SourceLanguageFlow[];
}

const SourceLanguageSankey = ({ flows }: Props) => {
  return (
    <section className="overflow-hidden">
      <div className="flex h-[500px] w-full flex-col">
        <SankeyHeader />
        <SankeyChart flows={flows} />
      </div>
    </section>
  );
};

export default SourceLanguageSankey;
