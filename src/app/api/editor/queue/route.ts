import { NextRequest, NextResponse } from "next/server";
import { listStories } from "@/lib/newsroom/repository";
import { StoryStatus } from "@/types";

const allowedStatuses: StoryStatus[] = [
  "queued",
  "verifying",
  "approved",
  "published",
  "corrected",
];

export async function GET(request: NextRequest) {
  const statusParam = request.nextUrl.searchParams.get("status");
  const status =
    statusParam && allowedStatuses.includes(statusParam as StoryStatus)
      ? (statusParam as StoryStatus)
      : undefined;

  const items = listStories(status);

  return NextResponse.json(
    {
      count: items.length,
      status: status ?? "all",
      items,
    },
    { status: 200 }
  );
}
