"use server"

import { signIn } from "@/auth"
import prisma from "@/lib/dbConnect"
import generateVerificationToken from "@/lib/generateVerificationToken"
import sendVerificationOTPEmail from "@/lib/sendVerificationEmail"
import { emailSchema, signinSchema } from "@/zodSchemas/signin"
import * as z from "zod"
import { DEFAULT_SIGNIN_REDIRECT } from "../../routes"
import { AuthError } from "next-auth"

// let email = ""

async function sendVerificationOTP(values: z.infer<typeof emailSchema>) {
	const validatedFields = emailSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: "Invalid email address." }
	}

	let email = validatedFields.data.email
	let user = await prisma.user.findUnique({ where: { email: email } })

	if (user) {
		let verificationOTP = await generateVerificationToken(email, true)
		await sendVerificationOTPEmail(email, verificationOTP, true)
	} else {
		let verificationOTP = await generateVerificationToken(email, false)
		await sendVerificationOTPEmail(email, verificationOTP, false)
	}

	return { success: `Email sent to ${validatedFields.data}` }
}

async function signin(values: z.infer<typeof signinSchema>) {
	const validatedFields = signinSchema.safeParse(values)
	if (!validatedFields.success) {
		return { error: "Invalid fields" }
	}

	const { email, otp, callbackUrl } = validatedFields.data

	const user = await prisma.user.findFirst({ where: { email: email } })

	const redirectURL = user?.name ? DEFAULT_SIGNIN_REDIRECT : "/profile"

	try {
		let url = await signIn("credentials", {
			email,
			otp,
			// redirect: false,
			redirectTo: callbackUrl || redirectURL,
		})
		console.log("Signin Successful in signin.ts")
		return { success: "Signin Successful" }
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid credentials" }

				// case "CallbackRouteError":
				// 	return error.cause?.err?.toString()

				default:
					return { error: "Something went wrong!" }
			}
		}
		throw error
	}
	// return { success: "Signin Successful" }
}

export { sendVerificationOTP, signin }
