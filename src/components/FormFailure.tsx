import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface FormFailureProps {
	message?: string
}

import React from "react"

function FormFailure({ message }: FormFailureProps) {
	if (!message) return

	return (
		<div>
			<ExclamationTriangleIcon />
			<p>{message}</p>
		</div>
	)
}

export default FormFailure
