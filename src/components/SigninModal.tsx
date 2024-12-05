"use client"

import {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card"
import EmailSigninForm from "./emailSigninForm"
import { useState } from "react"
import EmailOTPVerificationForm from "./emailOTPVerificationForm"
import { Button } from "./ui/button"
import { FcGoogle } from "react-icons/fc"

function SigninModal() {
	const [otpSent, setOtpSent] = useState<boolean>(false)
	const [email, setEmail] = useState<string>("")

	return (
		<div className="absolute w-full h-full flex justify-center items-center">
			<Card>
				<CardHeader>
					<CardTitle>Signin/Signup</CardTitle>
					<CardDescription>
						{otpSent ? (
							<div>
								Verification OTP sent on{" "}
								<span className="font-bold">{email}</span> (
								<span
									className="cursor-pointer text-blue-500 hover:underline"
									onClick={() => setOtpSent(false)}
								>
									Edit
								</span>
								)
							</div>
						) : (
							"Enter your email"
						)}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{otpSent ? (
						<EmailOTPVerificationForm emailFromUser={email} />
					) : (
						<>
							<EmailSigninForm
								setOtpSent={setOtpSent}
								emailFromUser={email}
								setEmailFromUser={setEmail}
							/>
							<Button>
								<FcGoogle />
								<span>Continue with Google</span>
							</Button>
						</>
					)}
				</CardContent>
				<CardFooter></CardFooter>
			</Card>
		</div>
	)
}

export default SigninModal
