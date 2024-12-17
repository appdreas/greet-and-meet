import { NextRequest, NextResponse } from "next/server";
import checkAuthentication from "./app/actions/auth/checkAuthentication";

export async function middleware(request: NextRequest) {
  const { isAuthenticated } = await checkAuthentication();

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/activities"],
};
