import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import prisma from "./lib/dbConnect"
import authConfig from "./auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	callbacks: {
		async jwt({ token }) {
			console.log("jwt token: ", token)
			// console.log("jwt user: ", user)
			// if (token) {
			// 	// const iat = new Date(token?.iat * 1000).toUTCString()
			// 	// token.exp = token?.iat + 1209600
			// 	// const exp = new Date(token?.exp * 1000).toUTCString()
			// 	// console.log("iat: ", iat)
			// 	// console.log("exp: ", exp)
			// 	// token.userID = token.sub
			// }
			return token
		},
		async session({ session, token }) {
			console.log("session: ", session)
			console.log("session token: ", token)
			if (token.sub && session.user) {
				session.user.id = token.sub
			}
			return session
		},
	},
	session: {
		strategy: "jwt",
		maxAge: 10 * 24 * 60 * 60,
	},
	...authConfig,
})
