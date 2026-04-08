import Link from "next/link";
import { Clock } from "lucide-react";
import { Article } from "@/types";
import { formatDate } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact";
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  if (variant === "featured") {
    return (
      <Link
        href={`/article/${article.slug}`}
        className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-surface-200 border border-slate-200 hover:border-slate-300 card-hover transition-all"
      >
        {/* Image placeholder */}
        <div className="aspect-[16/9] bg-surface-300 relative overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-t from-surface-200 via-transparent to-transparent z-10" />
          <div
            className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at 30% 40%, ${article.category.color}33, transparent 60%)`,
            }}
          />
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <span
            className="category-badge mb-3"
            style={{
              backgroundColor: `${article.category.color}15`,
              color: article.category.color,
            }}
          >
            {article.category.name}
          </span>
          <h2 className="font-display font-bold text-xl md:text-2xl text-slate-900 mb-2 group-hover:text-brand-500 transition-colors leading-tight">
            {article.title}
          </h2>
          <p className="text-neutral-700 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span className="font-display font-medium">{article.author.name}</span>
            <span>&middot;</span>
            <span>{formatDate(article.publishedAt)}</span>
            {article.readingTime && (
              <>
                <span>&middot;</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.readingTime} min
                </span>
              </>
            )}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/article/${article.slug}`}
        className="group flex gap-3 py-3 border-b border-slate-200 last:border-0 hover:bg-surface-300/30 transition-colors rounded px-1"
      >
        <div className="flex-1 min-w-0">
          <span
            className="category-badge mb-1 text-[9px] inline-block"
            style={{
              backgroundColor: `${article.category.color}15`,
              color: article.category.color,
            }}
          >
            {article.category.name}
          </span>
          <h3 className="font-display font-semibold text-xs text-slate-800 group-hover:text-brand-500 transition-colors leading-tight line-clamp-2">
            {article.title}
          </h3>
          <span className="text-[10px] text-neutral-600 mt-0.5 block">
            {formatDate(article.publishedAt)}
          </span>
        </div>
      </Link>
    );
  }

  // Default card
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group flex flex-col h-full overflow-hidden rounded-xl bg-surface-200 border border-slate-200 hover:border-slate-300 card-hover transition-all"
    >
      <div className="aspect-[16/10] bg-surface-300 relative overflow-hidden flex-shrink-0">
        <div
          className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${article.category.color}44, transparent 70%)`,
          }}
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <span
          className="category-badge mb-2 text-[10px]"
          style={{
            backgroundColor: `${article.category.color}15`,
            color: article.category.color,
          }}
        >
          {article.category.name}
        </span>
        <h3 className="font-display font-bold text-base text-slate-900 mb-1.5 group-hover:text-brand-500 transition-colors leading-snug line-clamp-2">
          {article.title}
        </h3>
        <p className="text-neutral-700 text-sm line-clamp-2 leading-relaxed mb-3 flex-grow">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span>{formatDate(article.publishedAt)}</span>
          <span>&middot;</span>
          <span className="flex items-center gap-1">{article.readingTime} min</span>
        </div>
      </div>
    </Link>
  );
}
