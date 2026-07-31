import { NextRequest, NextResponse } from "next/server";
import { searchArticles } from "@/lib/search";
import { paginate, DEFAULT_PAGE_SIZE } from "@/lib/pagination";
import { toSummary } from "@/lib/articles";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") ?? "";
  const page = searchParams.get("page") ?? "1";

  const results = searchArticles(query);
  const paginated = paginate(results, page, DEFAULT_PAGE_SIZE);

  return NextResponse.json({
    query,
    totalItems: paginated.totalItems,
    totalPages: paginated.totalPages,
    currentPage: paginated.currentPage,
    results: paginated.items.map(toSummary),
  });
}
