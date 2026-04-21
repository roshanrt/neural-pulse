import { NextRequest, NextResponse } from "next/server";
import { getStoryById, updateStoryStatus } from "@/lib/newsroom/repository";
import { StoryStatus } from "@/types";

const editableStatuses: StoryStatus[] = [
  "queued",
  "verifying",
  "approved",
  "published",
  "corrected",
];

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const story = getStoryById(id);
  if (!story) {
    return NextResponse.json({ error: "Story not found" }, { status: 404 });
  }
  return NextResponse.json(story, { status: 200 });
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();
  const status = String(body?.status || "") as StoryStatus;

  if (!editableStatuses.includes(status)) {
    return NextResponse.json(
      { error: "Invalid status. Allowed: queued, verifying, approved, published, corrected." },
      { status: 400 }
    );
  }

  const updated = updateStoryStatus(id, status);
  if (!updated) {
    return NextResponse.json({ error: "Story not found" }, { status: 404 });
  }

  return NextResponse.json(updated, { status: 200 });
}
