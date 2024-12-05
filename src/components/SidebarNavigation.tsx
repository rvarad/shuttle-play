import React from "react"
import {
	SidebarProvider,
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarGroup,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarFooter,
} from "./ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"
import Link from "next/link"
import { Collapsible, CollapsibleContent } from "./ui/collapsible"
import { ChevronDownCircle } from "lucide-react"
import { CollapsibleTrigger } from "@radix-ui/react-collapsible"
import SignOutBtn from "./SignOutBtn"

async function SidebarNavigation({ children }: { children: React.ReactNode }) {
	const session = await auth()

	return (
		<SidebarProvider>
			<SessionProvider>
				{/* <AppSidebar /> */}
				<Sidebar>
					<SidebarHeader>
						<div className="profile-photo"></div>
						<div className="name">
							{session?.user?.name ? session.user.name : session?.user?.email}
						</div>
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton
											asChild
											isActive
										>
											<Link href={"/profile"}>Profile</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											asChild
											isActive
										>
											<Link href={"/games"}>Games</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											asChild
											isActive
										>
											<Link href={"#"}>Communities</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
						<Collapsible>
							<SidebarGroup>
								<SidebarGroupLabel asChild>
									<CollapsibleTrigger>
										Account
										<ChevronDownCircle className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
									</CollapsibleTrigger>
								</SidebarGroupLabel>
								<CollapsibleContent>
									<SidebarGroupContent>
										<SidebarMenu>
											<SidebarMenuItem>
												<SidebarMenuButton asChild>
													<Link href={"#"}>Account Settings</Link>
												</SidebarMenuButton>
											</SidebarMenuItem>
											<SidebarMenuItem>
												<SidebarMenuButton asChild>
													<SignOutBtn />
												</SidebarMenuButton>
											</SidebarMenuItem>
										</SidebarMenu>
									</SidebarGroupContent>
								</CollapsibleContent>
							</SidebarGroup>
						</Collapsible>
					</SidebarContent>
					<SidebarFooter>
						<Link href={"#"}>Feedback</Link>
					</SidebarFooter>
				</Sidebar>
			</SessionProvider>
			{children}
		</SidebarProvider>
	)
}

export default SidebarNavigation
