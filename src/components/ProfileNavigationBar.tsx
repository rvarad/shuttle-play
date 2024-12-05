"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

function ProfileNavigationBar() {
	const pathname = usePathname()

	const style = "font-bold"

	return (
		<nav className="h-[10%] flex flex-row justify-between">
			<Link href={"/"}>Logo</Link>
			<Link
				href={"/play"}
				className={pathname === "/play" ? style : ""}
			>
				Play
			</Link>
			{/* <Link
				href={"/discuss"}
				className={pathname === "/discuss" ? style : ""}
			>
				Discuss
			</Link> */}
		</nav>
	)
}

export default ProfileNavigationBar
