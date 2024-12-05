"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import * as z from "zod"
import { emailSchema } from "../zodSchemas/signin"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import FormFailure from "./FormFailure"
import FormSuccess from "./FormSuccess"
import { sendVerificationOTP } from "@/actions/signin"
import React, { useState, useTransition } from "react"

interface EmailSigninFormProps {
	setOtpSent: React.Dispatch<React.SetStateAction<boolean>>
	emailFromUser: string
	setEmailFromUser: React.Dispatch<React.SetStateAction<string>>
}

function EmailSigninForm({
	setOtpSent,
	emailFromUser,
	setEmailFromUser,
}: EmailSigninFormProps) {
	const [isPending, startTransition] = useTransition()
	const [errorMessage, setErrorMessage] = useState<string | undefined>("")
	const [successMessage, setSuccessMessage] = useState<string | undefined>("")
	const form = useForm<z.infer<typeof emailSchema>>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: emailFromUser || "",
		},
	})

	function onSubmit(values: z.infer<typeof emailSchema>) {
		setErrorMessage("")
		setSuccessMessage("")

		startTransition(() => {
			sendVerificationOTP(values).then((res) => {
				setErrorMessage(res?.error)
				setSuccessMessage(res?.success)
				setOtpSent(true)
				setEmailFromUser(values.email)
			})
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormFailure message={errorMessage} />
				<FormSuccess message={successMessage} />
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							{/* <FormLabel>Email</FormLabel> */}
							<FormControl>
								<Input
									{...field}
									type="email"
									placeholder="example@email.com"
									disabled={isPending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					type="submit"
					className="w-[50%]"
					disabled={isPending}
				>
					Send OTP
				</Button>
			</form>
		</Form>
	)
}

export default EmailSigninForm
