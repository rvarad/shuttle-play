import { auth } from "@/auth"
import { NextRequest } from "next/server"
import { v2 as cloudinary } from "cloudinary"

async function PATCH(req: NextRequest, res: NextRequest) {
	const session = await auth()
}
