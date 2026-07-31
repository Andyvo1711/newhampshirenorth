import ArticleCard from "@/components/ArticleCard";
import type { Article } from "@/types/article";

interface ArticleListProps {
  articles: Article[];
  emptyMessage?: string;
}

export default function ArticleList({ articles, emptyMessage }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <p className="border-t border-line-light py-10 font-sans text-sm text-ink-soft">
        {emptyMessage ?? "No articles found."}
      </p>
    );
  }

  return (
    <div className="border-t border-line-light">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
