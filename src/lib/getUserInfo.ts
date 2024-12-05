import prisma from "./dbConnect"

async function getUserWithEmail(email: string, fields?: object) {
	try {
		const userInfo = await prisma.user.findFirst({
			where: { email: email },
			select: fields,
		})
		return userInfo
	} catch (error) {
		console.log(error)
	}
}

async function getUserWithUserId(userId: string, fields?: object) {
	try {
		const userInfo = await prisma.user.findFirst({
			where: { id: userId },
			select: fields,
		})
		return userInfo
	} catch (error) {
		console.log(error)
	}
}

async function getUserWithUsername(username: string, fields: object) {
	try {
		const userInfo = await prisma.user.findFirst({
			where: { username: username },
			select: fields,
		})
		return userInfo
	} catch (error) {
		console.log(error)
	}
}

export { getUserWithUserId, getUserWithEmail, getUserWithUsername }
