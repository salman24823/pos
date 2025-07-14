// middleware.js
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;

  // Allow the homepage even if unauthenticated
  if (!req.auth && nextUrl.pathname !== "/") {
    return NextResponse.redirect(new URL("/", nextUrl.origin));
  }

  // Otherwise, allow
  return NextResponse.next();
});

// Export the middleware function itself to Next.js
export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"], // Protect all pages except static and API
};
