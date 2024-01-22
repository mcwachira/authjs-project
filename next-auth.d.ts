import NextAuth, {type DefaultSession} from "next-auth"
import {UserRole} from "@prisma/client";


export type ExtendUser = DefaultSession['user'] & {
    role:UserRole
}
declare  module 'next-auth'{

    interface Session {
    user:ExtendUser

    }
}

declare module "@auth/core/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        idToken?: string
        role?:"ADMIN"| "USER"
    }
}