import { NextRequest, NextResponse } from "next/server";
import { getStoryById, listStories, updateStoryStatus } from "@/lib/newsroom/repository";

type PublishPayload = {
  storyIds?: string[];
  publishApproved?: boolean;
};

export async function POST(request: NextRequest) {
  const body = (await request.json()) as PublishPayload;
  const byIds = Array.isArray(body.storyIds) ? body.storyIds : [];

  const candidateIds =
    byIds.length > 0
      ? byIds
      : body.publishApproved
        ? listStories("approved").map((story) => story.id)
        : [];

  if (candidateIds.length === 0) {
    return NextResponse.json(
      { error: "No publish candidates provided. Use storyIds[] or publishApproved=true." },
      { status: 400 }
    );
  }

  const published = [];
  const rejected = [];

  for (const id of candidateIds) {
    const story = getStoryById(id);
    if (!story) {
      rejected.push({ id, reason: "Story not found" });
      continue;
    }
    if (story.status !== "approved") {
      rejected.push({ id, reason: `Story status is ${story.status}, expected approved` });
      continue;
    }
    const updated = updateStoryStatus(id, "published");
    if (updated) {
      published.push(updated);
    }
  }

  return NextResponse.json(
    {
      published: published.length,
      rejected: rejected.length,
      items: published,
      errors: rejected,
    },
    { status: 200 }
  );
}
