import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import * as z from "zod"
import { signinSchema } from "@/zodSchemas/signin"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"
import FormSuccess from "./FormSuccess"
import FormFailure from "./FormFailure"
import { signin } from "@/actions/signin"
import CountDownTimer from "./CountDownTimer"
import { useRouter, useSearchParams } from "next/navigation"

interface EmailOTPVerificationFormProps {
	emailFromUser: string
}

function EmailOTPVerificationForm({
	emailFromUser,
}: EmailOTPVerificationFormProps) {
	const [errorMessage, setErrorMessage] = useState<string | undefined>("")
	const [successMessage, setSuccessMessage] = useState<string | undefined>("")
	const [resendOtpTimerActive, setResendOtpTimerActive] =
		useState<boolean>(true)
	const searchParams = useSearchParams()
	const form = useForm<z.infer<typeof signinSchema>>({
		resolver: zodResolver(signinSchema),
		defaultValues: {
			email: emailFromUser,
			otp: "",
			callbackUrl: searchParams.get("callbackUrl") || "",
		},
	})

	function onSubmit(values: z.infer<typeof signinSchema>) {
		setErrorMessage("")
		setSuccessMessage("")
		console.log(values)
		signin(values).then((res) => {
			setErrorMessage(res?.error || "")
			setSuccessMessage(res?.success || "")
			// router.push(res.url)
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormFailure message={errorMessage} />
				<FormSuccess message={successMessage} />
				<FormField
					control={form.control}
					name="otp"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									type="tel"
									maxLength={6}
									pattern="[0-9]*"
									placeholder="123456"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="w-[50%]"
				>
					Verify
				</Button>
			</form>
			{resendOtpTimerActive ? (
				<span>
					Resend OTP in{" "}
					<CountDownTimer
						initialSeconds={90}
						setTimerActive={setResendOtpTimerActive}
					/>
				</span>
			) : (
				<span>Resend OTP</span>
			)}
		</Form>
	)
}

export default EmailOTPVerificationForm
