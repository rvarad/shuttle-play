/**
 * List of routes that should be publicly accessible
 * These do not require authentication
 * @type {string[]}
 */
const publicRoutes = ["/", "/play"]

/**
 * List of routes that are not publicly accessible
 * These require authentication
 * @type {string[]}
 */
const protectedRoutes = ["/profile", "/discuss"]

/**
 * List of routes that are used for authentication
 * These will redirect user to "/" if already signed in
 * @type {string[]}
 */
const authenticationRoutes = ["/signin"]

/**
 * Prefix for API routes used for authentication
 * Routes that start with this prefix are used for authentication api, available to signed in and signed out users
 * @type {string}
 */
const API_AUTH_PREFIX = "/api/auth"

/**
 * Route that the user should be redirect to after signing in by default
 * @type {string}
 */
const DEFAULT_SIGNIN_REDIRECT = "/"

export {
	publicRoutes,
	protectedRoutes,
	authenticationRoutes,
	API_AUTH_PREFIX,
	DEFAULT_SIGNIN_REDIRECT,
}
