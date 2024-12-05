import { Resend } from "resend"
import LoginVerificationOTPEmailTemplate from "../../email-templates/LoginVerificationOTP"

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendVerificationOTPEmail(
	email: string,
	verificationOTP: string,
	newUser: boolean,
	name?: string
) {
	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: newUser
			? "Verify your email address for signing up"
			: "Verify your email address for signing in",
		react: LoginVerificationOTPEmailTemplate({
			name,
			verificationOTP,
			newUser,
		}),
	})
}

export default sendVerificationOTPEmail
