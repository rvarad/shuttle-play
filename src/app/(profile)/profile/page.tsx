import { auth } from "@/auth"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { getUserWithUserId } from "@/lib/getUserInfo"
import Link from "next/link"
import { redirect } from "next/navigation"
import React, { cache } from "react"

const userDetails = cache(
	async (userId: string, expiry: Date, fields?: object) => {
		if (new Date(expiry).getTime() > new Date().getTime()) {
			const user = await getUserWithUserId(userId, fields)

			return user
		} else {
			throw new Error("Session expired")
		}
	}
)

async function Page() {
	const session = await auth()

	const user = await userDetails(session?.user?.id, session?.expires)

	// console.log("user: ", user)

	return (
		<div className="flex flex-col">
			<div>
				<div>name: {user?.name}</div>
				<div>email: {user?.email}</div>
				<div className="">username: {user?.username}</div>
				<div>level: {user?.level}</div>
			</div>
			<div>
				<img
					src={user?.image}
					alt="image"
				/>
			</div>
			<div>
				<Link href={"/profile/editprofile"}>Edit</Link>
			</div>
		</div>
	)
}

export default Page
