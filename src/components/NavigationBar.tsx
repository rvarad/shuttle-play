"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

// interface NavigationBarProps {
// 	session: Session | null
// }

function NavigationBar() {
	const pathname = usePathname()
	const { data: session, status } = useSession()
	const [authStatus, setAuthStatus] = useState(false)

	useEffect(() => {
		if (status === "authenticated") {
			setAuthStatus(true)
		} else {
			setAuthStatus(false)
		}
	}, [status, session])

	const style = "font-bold"

	return (
		<>
			<Link
				href={"/"}
				className="logo"
			>
				Logo
			</Link>
			<Link
				href={"/play"}
				className={pathname === "/play" ? style : ""}
			>
				Play
			</Link>
			{authStatus && (
				<Link
					href={"/discuss"}
					className={pathname === "/discuss" ? style : ""}
				>
					Discuss
				</Link>
			)}
		</>
	)

	// if (!session) {
	// 	return <></>
	// }

	// return (
	// 	<>
	// 		<Link
	// 			href={"/"}
	// 			className="logo"
	// 		>
	// 			Logo
	// 		</Link>
	// 		<Link
	// 			href={"/play"}
	// 			className={pathname === "/play" ? style : ""}
	// 		>
	// 			Play
	// 		</Link>
	// 		<Link
	// 			href={"/discuss"}
	// 			className={pathname === "/discuss" ? style : ""}
	// 		>
	// 			Discuss
	// 		</Link>
	// 	</>
	// )
}

export default NavigationBar
