import { CircleQuestionMark } from 'lucide-react';

import type { InfluentialCountry } from '@/types';

import InfluentialSentimentBars from './components/InfluentialSentimentBars';
import SentimentScaleLegend from './components/SentimentScaleLegend';

interface Props {
  countries: InfluentialCountry[];
}

const InfluentialCountriesChart = ({ countries }: Props) => {
  return (
    <section className="p-4 pl-0">
      <h3 className="text-base font-semibold text-neutral-100 flex items-center">
        Top 20 influential countries
        <CircleQuestionMark className="ml-2 h-4 w-4 text-neutral-400" />
      </h3>

      <div className="mt-3 flex h-[420px]">
        <div className="flex-1">
          <InfluentialSentimentBars countries={countries} />
        </div>
        <SentimentScaleLegend />
      </div>
    </section>
  );
};

export default InfluentialCountriesChart;
