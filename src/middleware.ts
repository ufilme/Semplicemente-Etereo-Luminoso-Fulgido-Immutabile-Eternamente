import { NextRequest, NextResponse } from "next/server";
import { redirect } from 'next/navigation'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const loginUrl = request.nextUrl.clone()
  loginUrl.pathname = '/auth/login'

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  const apiUrl = request.nextUrl.clone()
  apiUrl.pathname = "/api/auth/checkToken";
  
  const requestData = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({"token": token}),
  };

  const r = await fetch(apiUrl, requestData)

  if (!r.ok) {
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
		'/((?!api|_next/static|_next/image|auth|public|scripts|images|favicon.ico).*)',
		'/'
	]
}