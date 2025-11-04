import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
	// Temporarily disabled for demo purposes - allows access without auth
	// TODO: Re-enable authentication in production
	// if (!sessionCookie) {
	// 	return NextResponse.redirect(new URL("/", request.url));
	// }

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard"], 
};