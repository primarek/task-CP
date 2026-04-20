import type { NewsArticle } from '@/types';

interface Props {
  articles: NewsArticle[];
}

const formatPublishedDate = (isoDate: string) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoDate));
};

const ArticlesTable = ({ articles }: Props) => {
  if (articles.length === 0) {
    return (
      <div className="mt-4 border border-dashed border-neutral-700 p-6 text-sm text-neutral-400">
        No articles match current filters.
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-x-auto border border-neutral-800">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-neutral-950 text-xs uppercase tracking-wide text-neutral-400">
          <tr>
            <th className="px-3 py-2">Title</th>
            <th className="px-3 py-2">Domain</th>
            <th className="px-3 py-2">Source country</th>
            <th className="px-3 py-2">Language</th>
            <th className="px-3 py-2">Published date</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-t border-neutral-800 text-neutral-200">
              <td className="px-3 py-2">
                <a href={article.url} target="_blank" rel="noreferrer" className="hover:text-amber-300">
                  {article.title}
                </a>
              </td>
              <td className="px-3 py-2">{article.domain}</td>
              <td className="px-3 py-2">{article.sourceCountry.name}</td>
              <td className="px-3 py-2">{article.language}</td>
              <td className="px-3 py-2">{formatPublishedDate(article.publishedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticlesTable;
