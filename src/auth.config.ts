import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { signinSchema } from "./zodSchemas/signin"
import prisma from "./lib/dbConnect"
import bcrypt from "bcryptjs"

export default {
	providers: [
		Credentials({
			authorize: async (credentials) => {
				let user = null

				const validatedFields = signinSchema.safeParse(credentials)

				if (validatedFields.success) {
					const { email, otp } = validatedFields.data

					const verificationToken = await prisma.verificationToken.findFirst({
						where: { email: email },
					})

					if (!verificationToken) return null

					const verificationSuccessful = await bcrypt.compare(
						otp,
						verificationToken.otp
					)

					console.log(verificationSuccessful)

					if (verificationSuccessful) {
						if (verificationToken.existingUser) {
							user = await prisma.user.findFirst({ where: { email: email } })
						} else {
							user = await prisma.user.create({
								data: {
									email: email,
								},
							})
						}
						console.log("User: ", user)

						await prisma.verificationToken.delete({ where: { email: email } })
					}
				}

				return user
			},
		}),
	],
} satisfies NextAuthConfig
