import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const url = new URL(request.url);
    const targetUrl = new URL(request.nextUrl.pathname, API_URL);
    targetUrl.search = url.search;

    const response = NextResponse.rewrite(targetUrl);

    request.headers.forEach((value, key) => {
      if (key.toLowerCase().startsWith("cookie")) {
        response.headers.set(key, value);
      }
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
