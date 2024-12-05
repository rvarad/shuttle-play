import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

import SigninBtn from "@/components/SigninBtn"
import NavigationBar from "@/components/NavigationBar"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"
import NavBarDropdownMenu from "@/components/NavBarDropdownMenu"

// export const metadata: Metadata = {
// 	title: "Create Next App",
// 	description: "Generated by create next app",
// }

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await auth()

	return (
		<html lang="en">
			<body className={inter.className}>
				<nav className="flex flex-row justify-between">
					<SessionProvider>
						<NavigationBar />
					</SessionProvider>
					{session?.user ? (
						<NavBarDropdownMenu
							avatar={session?.user?.image || ""}
							email={session?.user?.email || ""}
							name={session?.user?.name || ""}
						/>
					) : (
						<SigninBtn />
					)}
				</nav>
				{children}
			</body>
		</html>
	)
}
