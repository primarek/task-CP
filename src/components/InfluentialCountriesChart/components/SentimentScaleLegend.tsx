const SentimentScaleLegend = () => {
  return (
    <div className="flex w-24 justify-center pb-20">
      <div className="relative h-full w-1.5">
        <div className="absolute left-0 top-0 h-1/2 w-full bg-[#A44A42]" />
        <div className="absolute left-0 top-1/2 h-1/2 w-full bg-[#4A63D9]" />
        <span className="absolute left-2.5 top-0 -translate-y-1/2 text-[10px] uppercase text-neutral-300">
          Negative
        </span>
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 px-1 text-[9px] uppercase text-neutral-200">
          Neutral
        </span>
        <span className="absolute left-2.5 bottom-0 translate-y-1/2 text-[10px] uppercase text-neutral-300">
          Positive
        </span>
      </div>
    </div>
  );
};

export default SentimentScaleLegend;
