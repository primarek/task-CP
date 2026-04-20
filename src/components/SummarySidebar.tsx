import { CircleQuestionMark } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useMemo } from 'react';

interface SummarySidebarProps {
  summaryBody: string | null;
  summaryError: string | null;
  isGenerating: boolean;
  onGenerateSummary: () => void;
}

const renderInlineBold = (text: string) => {
  const pieces = text.split(/(\*\*.*?\*\*)/g);

  return pieces.map((piece, index) => {
    if (piece.startsWith('**') && piece.endsWith('**')) {
      return <strong key={`${piece}-${index}`}>{piece.slice(2, -2)}</strong>;
    }

    return <span key={`${piece}-${index}`}>{piece}</span>;
  });
};

const SummarySidebar = ({ summaryBody, summaryError, isGenerating, onGenerateSummary }: SummarySidebarProps) => {
  const sections = useMemo(() => {
    if (!summaryBody) return [];

    return summaryBody
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }, [summaryBody]);

  return (
    <aside className="border-r border-neutral-800 px-6">
      <Tooltip.Provider delayDuration={150}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button type="button" className="flex items-center text-left">
              <span className="text-lg font-medium uppercase text-neutral-100">Summary of the Day</span>
              <CircleQuestionMark className="ml-2 h-4 w-4 text-neutral-400" />
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="top"
              sideOffset={8}
              className="z-50 max-w-sm rounded-md border border-neutral-700 bg-neutral-950 p-3 text-sm leading-6 text-neutral-200 shadow-lg"
            >
              <p>
                This summary focuses on key risk factors, security concerns, and other developments that could affect
                national stability. You'll get an overview of emerging threats, political tensions, econonic pressures
                and events that may influence the safety and stability of selected country or region.
              </p>
              <p className="mt-2">
                We provide short and plain Key Points that resonated most the latest news, helping you grasp the
                essentials quickly.
              </p>
              <Tooltip.Arrow className="fill-neutral-950" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>

      <p className="mt-4 text-sm leading-relaxed text-neutral-300">
        Stay informed about the most critical issues shaping the world and make sense of complex situations at a glance.
      </p>

      <p className="mt-4 text-xs leading-relaxed text-neutral-400">
        Use the button below to summarize global news and explore what's happening in your selected location.
      </p>

      <button
        type="button"
        className="mt-6 w-full px-3 py-2 text-sm text-neutral-white disabled:cursor-not-allowed disabled:opacity-60 border border-white hover:bg-neutral-800"
        onClick={onGenerateSummary}
        disabled={isGenerating}
      >
        {isGenerating ? 'Generating...' : 'Generate summary'}
      </button>

      {summaryError ? <p className="mt-3 text-sm text-red-400">{summaryError}</p> : null}

      {summaryBody && (
        <div className="mt-4 space-y-2 rounded-md border border-neutral-800 bg-neutral-950 p-3 text-sm leading-6 text-neutral-200">
          {sections.map((line, index) =>
            line.startsWith('- ') ? (
              <p key={`${line}-${index}`} className="pl-4">
                <span className="mr-2 text-amber-300">•</span>
                {renderInlineBold(line.slice(2))}
              </p>
            ) : (
              <p key={`${line}-${index}`}>{renderInlineBold(line)}</p>
            ),
          )}
        </div>
      )}
    </aside>
  );
};

export default SummarySidebar;
