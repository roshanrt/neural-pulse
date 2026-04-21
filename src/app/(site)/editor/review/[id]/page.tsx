import Link from "next/link";
import { notFound } from "next/navigation";
import { getStoryById } from "@/lib/newsroom/repository";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function EditorReviewPage({ params }: PageProps) {
  const { id } = await params;
  const story = getStoryById(id);

  if (!story) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 py-14">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Story Review</p>
          <h1 className="mt-2 font-display text-3xl font-black text-slate-900">{story.article.title}</h1>
        </div>
        <Link href="/editor/queue" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400">
          Back to queue
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-600">{story.article.excerpt}</p>
          <div className="mt-6 space-y-5 text-sm leading-7 text-slate-700">
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Summary</h2>
              <p className="mt-2">{story.article.sections.summary}</p>
            </section>
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Technical details</h2>
              <p className="mt-2 whitespace-pre-line">{story.article.sections.technicalDetails}</p>
            </section>
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Mitigation</h2>
              <p className="mt-2 whitespace-pre-line">{story.article.sections.mitigation}</p>
            </section>
          </div>
        </article>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Verification</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500">Status</dt>
                <dd className="font-semibold capitalize text-slate-800">{story.status}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500">Severity</dt>
                <dd className="font-semibold capitalize text-slate-800">{story.severity}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500">Confidence</dt>
                <dd className="font-semibold text-slate-800">{story.confidenceScore}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-slate-500">Corroboration</dt>
                <dd className="font-semibold text-slate-800">{story.corroborationCount}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Evidence</h3>
            {story.evidence.length === 0 ? (
              <p className="mt-3 text-sm text-slate-500">No evidence links attached yet.</p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm">
                {story.evidence.map((item) => (
                  <li key={item.url}>
                    <a href={item.url} target="_blank" rel="noreferrer" className="text-brand-700 hover:underline">
                      {item.label || item.source}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}
