interface Props {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const ArticlesPagination = ({ currentPage, totalPages, totalItems, pageSize, onPreviousPage, onNextPage }: Props) => {
  if (totalItems === 0) return null;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
      <span>
        Showing {start}-{end} of {totalItems}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="border border-neutral-700 px-2 py-1 text-neutral-300 transition hover:border-neutral-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Prev
        </button>
        <span className="text-neutral-300">
          Page {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="border border-neutral-700 px-2 py-1 text-neutral-300 transition hover:border-neutral-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ArticlesPagination;
