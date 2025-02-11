import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import { v2 as cloudinary } from "cloudinary"

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

function generateVerificationOTP() {
	return Math.floor(100000 + Math.random() * 900000).toString()
}

// cloudinary.config({
// 	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// 	api_key: process.env.CLOUDINARY_API_KEY,
// 	api_secret: process.env.CLOUDINARY_API_SECRET,
// })

// async function uploadImgToCloudinary(localFilePath: string) {
// 	try {
// 		if (!localFilePath) return null

// 		const response = await cloudinary.uploader.upload(localFilePath, {
// 			resource_type: "image",
// 		})
// 	} catch (error) {}
// }

export { cn, generateVerificationOTP }
