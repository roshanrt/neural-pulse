import { NextRequest, NextResponse } from "next/server";
import { buildArticleBundle, dedupeByHash, DraftInput } from "@/lib/content/pipeline";
import { createStoryRecord, listStories } from "@/lib/newsroom/repository";
import { verifyStory } from "@/lib/newsroom/verification";
import { StoryEvidence } from "@/types";

type IngestPayload = {
  items?: DraftInput[];
  defaultCorroborationCount?: number;
  evidenceByHash?: Record<string, StoryEvidence[]>;
};

export async function POST(request: NextRequest) {
  const body = (await request.json()) as IngestPayload;
  const inputs = Array.isArray(body.items) ? body.items : [];

  if (inputs.length === 0) {
    return NextResponse.json(
      { error: "No items provided. Expected payload.items[]" },
      { status: 400 }
    );
  }

  const bundles = dedupeByHash(inputs.map((item) => buildArticleBundle(item))).sort(
    (a, b) => b.json.priorityScore - a.json.priorityScore
  );

  const records = bundles.map((bundle) => {
    const evidence = body.evidenceByHash?.[bundle.json.hash] ?? [];
    const verification = verifyStory({
      article: bundle.json,
      evidence,
      corroborationCount: Number(body.defaultCorroborationCount ?? 1),
    });

    return createStoryRecord({
      article: bundle.json,
      status: verification.status,
      confidenceScore: verification.confidenceScore,
      confidenceLabel: verification.confidenceLabel,
      verificationNotes: verification.verificationNotes,
      corroborationCount: verification.corroborationCount,
      severity: verification.severity,
      patchStatus: verification.patchStatus,
      exploitStatus: verification.exploitStatus,
      affectedProducts: verification.affectedProducts,
      iocs: verification.iocs,
      evidence: verification.evidence,
    });
  });

  return NextResponse.json(
    {
      ingested: records.length,
      queued: records.filter((item) => item.status === "queued").length,
      verifying: records.filter((item) => item.status === "verifying").length,
      approved: records.filter((item) => item.status === "approved").length,
      records,
      totalInDesk: listStories().length,
    },
    { status: 200 }
  );
}
