import Link from "next/link";
import { listStories } from "@/lib/newsroom/repository";

export const dynamic = "force-dynamic";

const statusClasses: Record<string, string> = {
  queued: "bg-slate-100 text-slate-700",
  verifying: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-800",
  published: "bg-blue-100 text-blue-800",
  corrected: "bg-rose-100 text-rose-800",
};

export default function EditorQueuePage() {
  const stories = listStories();

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Editor Desk</p>
          <h1 className="mt-2 font-display text-3xl font-black text-slate-900">Verification Queue</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Review incoming cybersecurity stories before publication. High-impact stories should
            have at least two corroborating sources and a high confidence score.
          </p>
        </div>
        <Link href="/api/editor/queue" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400">
          View JSON
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3">Story</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Severity</th>
              <th className="px-4 py-3">Confidence</th>
              <th className="px-4 py-3">Corroboration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-sm">
            {stories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                  Queue is empty. Send stories to `POST /api/articles/ingest`.
                </td>
              </tr>
            ) : (
              stories.map((story) => (
                <tr key={story.id} className="align-top">
                  <td className="px-4 py-4">
                    <Link href={`/editor/review/${story.id}`} className="font-semibold text-slate-900 hover:text-brand-700">
                      {story.article.title}
                    </Link>
                    <p className="mt-1 text-xs text-slate-500">{story.article.slug}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[story.status] ?? "bg-slate-100 text-slate-700"}`}>
                      {story.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 capitalize text-slate-700">{story.severity}</td>
                  <td className="px-4 py-4">
                    <span className="font-semibold text-slate-900">{story.confidenceScore}</span>
                    <span className="ml-2 text-xs uppercase tracking-wide text-slate-500">
                      {story.confidenceLabel}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-700">{story.corroborationCount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
