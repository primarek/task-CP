import { ResponsiveBar } from '@nivo/bar';

import type { InfluentialCountry } from '@/types';

interface Props {
  countries: InfluentialCountry[];
}

const InfluentialSentimentBars = ({ countries }: Props) => {
  const data = [...countries].reverse().map((item) => ({
    country: item.country.name,
    sentimentScore: item.sentimentScore,
  }));

  return (
    <ResponsiveBar
      data={data}
      indexBy="country"
      keys={['sentimentScore']}
      layout="horizontal"
      margin={{ top: 10, right: 20, bottom: 50, left: 150 }}
      padding={0.28}
      valueScale={{ type: 'linear', min: -3, max: 1 }}
      colors={({ data: row }) => (row.sentimentScore >= 0 ? '#4A63D9' : '#A44A42')}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickValues: [-3, -2, -1, 0, 1],
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 8,
        renderTick: ({ x, y, value }) => (
          <g transform={`translate(${x},${y})`}>
            <text x={-145} y={0} textAnchor="start" dominantBaseline="middle" fill="#d4d4d4" fontSize={11}>
              {String(value)}
            </text>
          </g>
        ),
      }}
      labelSkipWidth={16}
      labelSkipHeight={12}
      labelTextColor="#171717"
      borderRadius={2}
      theme={{
        axis: {
          ticks: { text: { fill: '#d4d4d4', fontSize: 11 } },
          legend: { text: { fill: '#d4d4d4' } },
          domain: { line: { strokeWidth: 0 } },
        },
        grid: { line: { stroke: '#404040', strokeWidth: 1 } },
        tooltip: {
          container: {
            background: '#171717',
            color: '#f5f5f5',
            fontSize: 12,
          },
        },
      }}
      tooltip={(bar) => (
        <div className="border border-neutral-700 bg-neutral-950 px-2 py-1 text-xs text-neutral-100">
          {bar.indexValue}: {bar.formattedValue}
        </div>
      )}
      enableGridY={false}
      role="application"
      ariaLabel="Top influential countries sentiment bar chart"
      barAriaLabel={(bar) => `${bar.indexValue}: ${bar.formattedValue}`}
    />
  );
};

export default InfluentialSentimentBars;
