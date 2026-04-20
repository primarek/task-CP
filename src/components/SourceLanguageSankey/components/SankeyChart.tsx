import { ResponsiveSankey } from '@nivo/sankey';
import { buildColoredLinks, buildNodeColorMap, buildSankeyData } from '../helpers/sankeyData';
import type { SourceLanguageFlow } from '@/types';

interface Props {
  flows: SourceLanguageFlow[];
}

const SankeyChart = ({ flows }: Props) => {
  const { nodes, links } = buildSankeyData(flows);
  const colorById = buildNodeColorMap(nodes);
  const linksWithColor = buildColoredLinks(links, colorById);

  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-neutral-300">Country</span>
        <span className="text-sm text-neutral-300">Language</span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <ResponsiveSankey
          data={{ nodes, links: linksWithColor }}
          margin={{ top: 8, right: 10, bottom: 12, left: 10 }}
          align="justify"
          colors={({ id }) => colorById.get(String(id)) ?? '#737373'}
          nodeThickness={16}
          nodeSpacing={12}
          nodeOpacity={1}
          nodeHoverOthersOpacity={0.35}
          nodeBorderWidth={0}
          nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.5]] }}
          linkOpacity={0.9}
          linkHoverOthersOpacity={0.08}
          linkContract={0}
          linkBlendMode="screen"
          enableLinkGradient
          labelPosition="inside"
          labelOrientation="horizontal"
          labelPadding={10}
          labelTextColor="#d4d4d4"
          nodeTooltip={({ node }) => (
            <div className="rounded border border-neutral-700 bg-neutral-950 px-2 py-1 text-xs text-neutral-100">
              {String(node.id).replace(/^country:|^language:/, '')}
            </div>
          )}
          linkTooltip={({ link }) => (
            <div className="rounded border border-neutral-700 bg-neutral-950 px-2 py-1 text-xs text-neutral-100">
              {String(link.source.id).replace(/^country:/, '')} → {String(link.target.id).replace(/^language:/, '')}:{' '}
              {link.value.toLocaleString()} articles
            </div>
          )}
        />
      </div>
    </>
  );
};

export default SankeyChart;
