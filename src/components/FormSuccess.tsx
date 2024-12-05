import { CheckCircledIcon } from "@radix-ui/react-icons"

interface FormSuccessProps {
	message?: string
}

import React from "react"

function FormSuccess({ message }: FormSuccessProps) {
	if (!message) return

	return (
		<div>
			<CheckCircledIcon />
			<p>{message}</p>
		</div>
	)
}

export default FormSuccess
