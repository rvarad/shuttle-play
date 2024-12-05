import { z } from "zod"

const ACCEPTABLE_IMAGE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTABLE_IMAGE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/jpg",
	"image/webp",
]

const editProfileSchema = z.object({
	name: z.string(),
	username: z.string(),
	image: z
		.instanceof(File, { message: "Please select an image file." })
		.refine((file) => file.size <= ACCEPTABLE_IMAGE_SIZE, {
			message: "Please select an image with size less than 10MB.",
		})
		.refine((file) => ACCEPTABLE_IMAGE_TYPES.includes(file.type), {
			message: "Please select a JPEG, PNG, JPG or WEBP file.",
		})
		.or(z.string().url("Error while displaying image."))
		.optional(),
	level: z.enum(["BEGINNER", "INTERMEDIATE", "PROFICIENT"]),
})

export { editProfileSchema }
