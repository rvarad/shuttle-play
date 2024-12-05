"use client"

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"

interface SignOutBtnProps {
	callbackUrl?: string
}

function SignOutBtn({ callbackUrl }: SignOutBtnProps) {
	return (
		<Button onClick={() => signOut({ redirectTo: callbackUrl || "/" })}>
			Sign Out
		</Button>
	)
}

export default SignOutBtn
