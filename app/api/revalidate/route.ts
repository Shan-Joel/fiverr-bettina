import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";

/**
 * On-demand revalidation endpoint.
 *
 * WordPress calls this (from a WPCode snippet) every time content is saved, so
 * edits appear on the live site within a second or two instead of waiting for
 * the ISR interval. Protected by a shared secret (REVALIDATE_SECRET) sent either
 * as the `x-revalidate-secret` header or a `?secret=` query param.
 */

export const dynamic = "force-dynamic";

function authorized(req: NextRequest): boolean {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected) return false;
  const provided =
    req.headers.get("x-revalidate-secret") ??
    req.nextUrl.searchParams.get("secret");
  return provided === expected;
}

async function handle(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json(
      { revalidated: false, message: "Invalid or missing secret" },
      { status: 401 },
    );
  }
  // Expire every WordPress-backed fetch immediately (tagged "wp" in lib/wp.ts)
  // so the next request fetches fresh data, and regenerate all routes under the
  // root layout. In Next 16 revalidateTag requires a profile; { expire: 0 }
  // requests immediate expiry rather than stale-while-revalidate.
  revalidateTag("wp", { expire: 0 });
  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export async function POST(req: NextRequest) {
  return handle(req);
}

export async function GET(req: NextRequest) {
  return handle(req);
}
