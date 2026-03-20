import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    const url = new URL(request.url);
    const targetUrl = `${API_URL}${request.nextUrl.pathname}${url.search}`;

    const fetchResponse = await fetch(targetUrl, {
      method: request.method,
      headers: {
        ...Object.fromEntries(
          Array.from(request.headers.entries()).filter(
            ([key]) => !key.toLowerCase().startsWith("x-middleware")
          )
        ),
      },
      body: request.method !== "GET" && request.method !== "HEAD" 
        ? await request.text() 
        : undefined,
      credentials: "include",
    });

    const response = new NextResponse(fetchResponse.body, {
      status: fetchResponse.status,
      statusText: fetchResponse.statusText,
      headers: fetchResponse.headers,
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
