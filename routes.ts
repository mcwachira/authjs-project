/**
 * An array of routes that don't require authentication
 * @type {string[]}
 */

export const publicRoutes: string[] = [
    "/",
    "/auth/new-verification"
]

/**
 * An array of routes that are used for authentication
 * these routes don't require authentication
 * These routes will redirect logged-in user to settings page
 * @type {string[]}
 */

export const authRoutes: string[] = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]

/**
 *The prefix for API authentication routes *  that start with this prefix are  used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix: string="/api/auth/"


/**
 *Redirect path after log-in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/settings"