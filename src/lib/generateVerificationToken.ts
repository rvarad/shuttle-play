import prisma from "./dbConnect"
import { generateVerificationOTP } from "./utils"
import bcrypt from "bcryptjs"

async function generateVerificationToken(email: string, existingUser: boolean) {
	let newOTP = generateVerificationOTP()
	await prisma.verificationToken.upsert({
		create: {
			email: email,
			otp: await bcrypt.hash(newOTP, 10),
			existingUser: existingUser,
			expires: new Date(Date.now() + 300000),
		},
		update: {
			otp: await bcrypt.hash(newOTP, 10),
		},
		where: {
			email: email,
		},
	})

	return newOTP
}

export default generateVerificationToken
