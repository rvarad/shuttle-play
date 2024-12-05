import NextAuth from "next-auth"
import authConfig from "./auth.config"
import {
	API_AUTH_PREFIX,
	authenticationRoutes,
	DEFAULT_SIGNIN_REDIRECT,
	protectedRoutes,
	publicRoutes,
} from "../routes"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
	const { nextUrl } = req
	const loggedIn = !!req.auth
	console.log("ROUTE: ", nextUrl.pathname)
	console.log("IS LOGGED IN: ", loggedIn)

	const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX)
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
	const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname)
	const isAuthenticationRoute = authenticationRoutes.includes(nextUrl.pathname)

	const headers = new Headers(req.headers)
	headers.set("x-current-path", nextUrl.pathname)

	if (isApiAuthRoute) return

	if (isAuthenticationRoute) {
		if (loggedIn)
			return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl))
		return
	}

	if (isPublicRoute || (loggedIn && isProtectedRoute)) {
		return NextResponse.next({ headers })
	}

	if (!loggedIn && !isPublicRoute)
		return Response.redirect(new URL("/signin", nextUrl))

	return
})

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
}
