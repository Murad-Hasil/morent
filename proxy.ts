import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(_request: NextRequest) {
  if (!process.env.APP_SECRET) {
    return new NextResponse(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Configuration Error</title>
  <style>
    body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f6f7f9; }
    .box { background: white; border-radius: 12px; padding: 48px; max-width: 480px; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    h1 { color: #ED3F3F; font-size: 1.5rem; margin-bottom: 12px; }
    p { color: #6b7280; font-size: 0.95rem; line-height: 1.6; }
    code { background: #f3f4f6; border-radius: 6px; padding: 2px 8px; font-size: 0.85rem; color: #374151; }
  </style>
</head>
<body>
  <div class="box">
    <h1>Missing Configuration</h1>
    <p>This application requires a valid <code>.env.local</code> file to run.<br/>Please contact the project owner for access.</p>
  </div>
</body>
</html>`,
      {
        status: 503,
        headers: { "content-type": "text/html; charset=utf-8" },
      }
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
