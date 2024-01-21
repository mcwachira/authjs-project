/**
 * An array of routes that don't require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/"
]

/**
 * An array of routes that are used for authentication
 * these routes don't require authentication
 * These routes will redirect logged-in user to settings page
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register"
]

/**
 *The prefix for API authentication routes *  that start with this prefix are  used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix="/api/auth/"


/**
 *Redirect path after log-in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"