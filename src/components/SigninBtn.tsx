"use client"

import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

function SigninBtn() {
	const router = useRouter()

	return (
		<Button
			onClick={() => {
				console.log("clicked on  signin button")
				router.push("/signin")
			}}
		>
			Signin/Signup
		</Button>
	)
}

export default SigninBtn
