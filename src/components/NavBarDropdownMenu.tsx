"use client"

import Link from "next/link"
import { Button } from "./ui/button"
import SignOutBtn from "./SignOutBtn"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu"

interface NavBarDropdownMenuProps {
	avatar: string
	email: string
	name: string | null
}

function NavBarDropdownMenu({ avatar, email, name }: NavBarDropdownMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<img
					src={avatar}
					alt="avatar"
				/>
				<span>{name ? name : email}</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					<Link href="/profile">Profile</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<SignOutBtn />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default NavBarDropdownMenu
