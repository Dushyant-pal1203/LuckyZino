import { NextRequest, NextResponse } from "next/server";
import { withUser } from "./logger";
import { auth } from "auth";

type AnyResponse = Response | NextResponse;
type AnyHandler = (...args: any[]) => Promise<Response | NextResponse>;

/**
 * Higher-order handler wrapper that adds structured logging for API routes.
 *
 * Features:
 * - Automatically attaches `userId` from session (falls back to "anonymous").
 * - Logs request metadata (method, path, query).
 * - Logs response metadata (status, duration, error, reason).
 * - Produces concise top-level messages like:
 *   - "API POST /api/compliance/tier-state 200 in 123ms"
 *   - "API PUT /api/compliance/tier-state failed with 400"
 *   - "API GET /api/users crashed after 50ms"
 * - Full details (query, error, reason, stack) are available inside log meta.
 * ```
 */
export function withLogging(handler: AnyHandler) {
  return async (req: NextRequest): Promise<AnyResponse> => {
    const session = await auth();
    const userId = session?.user?.id || "anonymous";
    const log = withUser(userId);

    const url = new URL(req.url);
    const requestMeta = {
      method: req.method,
      url: req.url,
      path: url.pathname,
      query: Object.fromEntries(url.searchParams.entries()),
    };

    const start = Date.now();

    try {
      const res = await handler(req);
      const duration = Date.now() - start;

      let body: any = null;
      try {
        body = await res.clone().json();
      } catch {
        // ignore if not JSON
      }

      const responseMeta = {
        ...requestMeta,
        status: res.status,
        durationMs: duration,
        error: body?.error,
        reason: body?.reason,
      };

      if (res.status >= 400) {
        log.error(
          `API ${req.method} ${url.pathname} failed with ${res.status}`,
          responseMeta
        );
      } else {
        log.info(
          `API ${req.method} ${url.pathname} ${res.status} succeeded in ${duration}ms`,
          responseMeta
        );
      }

      return res;
    } catch (err: any) {
      const duration = Date.now() - start;
      log.error(
        `API ${req.method} ${url.pathname} failed after ${duration}ms`,
        {
          ...requestMeta,
          durationMs: duration,
          error: err?.message || err,
          stack: err?.stack,
        }
      );
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
