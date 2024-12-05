import { z } from "zod"

const emailSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }),
})

const signinSchema = z.object({
	email: z.string().email({ message: "Invalid email address." }),
	otp: z
		.string()
		.length(6, { message: "OTP must be 6 characters long." })
		.regex(/^\d{6}$/, { message: "Invalid OTP." }),
	callbackUrl: z.string().optional(),
})

// const verificationOTPSchema = z.object({
// 	otp: z
// 		.string()
// 		.length(6, { message: "OTP must be 6 characters long." })
// 		.regex(/^\d{6}$/, { message: "Invalid OTP." }),
// })

export { emailSchema, signinSchema }
