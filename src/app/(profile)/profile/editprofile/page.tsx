import { auth } from "@/auth"
import { getUserWithUserId } from "@/lib/getUserInfo"
import EditProfileForm from "./EditProfileForm"
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

async function Page() {
	const session = await auth()

	const userData = await getUserWithUserId(session?.user?.id, {
		name: true,
		username: true,
		image: true,
		level: true,
	})

	return (
		<>
			<form
				action={async () => {
					"use server"

					return redirect("/profile")
				}}
			>
				<button>Go back</button>
			</form>
			<EditProfileForm
				name={userData?.name}
				username={userData?.username}
				image={userData?.image}
				level={userData?.level}
			/>
		</>
	)
}

export default Page
