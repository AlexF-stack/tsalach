import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  const segment = pathname.split("/")[1];
  if (isLocale(segment)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-tsalach-locale", segment);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  // Always enter in English; users can switch to FR via the UI.
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  response.headers.set("x-tsalach-locale", defaultLocale);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

void locales;
