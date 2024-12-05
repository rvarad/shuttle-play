interface LoginVerificationOTPEmailTemplateProps {
	name?: string
	verificationOTP: string
	newUser: boolean
}

function LoginVerificationOTPEmailTemplate({
	name,
	verificationOTP,
	newUser,
}: LoginVerificationOTPEmailTemplateProps) {
	return (
		<div>
			<h3>{name ? `Welcome ${name}!` : `Welcome!`}</h3>
			<p>
				{newUser
					? "This is your verifcation OTP for signing up"
					: "This is your verifcation OTP for signing in"}
			</p>
			<h3>{verificationOTP}</h3>
		</div>
	)
}

export default LoginVerificationOTPEmailTemplate
