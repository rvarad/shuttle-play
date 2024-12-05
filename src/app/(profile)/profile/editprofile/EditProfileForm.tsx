"use client"

import React from "react"
import { useForm } from "react-hook-form"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { editProfileSchema } from "@/zodSchemas/editProfile"
import { zodResolver } from "@hookform/resolvers/zod"
import { redirect } from "next/navigation"
import * as z from "zod"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

interface EditProfileFormProps {
	name: string | null | undefined
	username: string | null | undefined
	image: string | undefined | null
	level?: "BEGINNER" | "INTERMEDIATE" | "PROFICIENT" | null
}

function EditProfileForm({
	name,
	username,
	image,
	level,
}: EditProfileFormProps) {
	const form = useForm<z.infer<typeof editProfileSchema>>({
		resolver: zodResolver(editProfileSchema),
		defaultValues: {
			name: name || "",
			username: username || "",
			image: image || undefined,
			level: level || undefined,
		},
	})

	function onSubmit(values: z.infer<typeof editProfileSchema>) {
		console.log(values)

		// return redirect("/profile")
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="text"
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="text"
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="level"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Level</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormItem>
										<FormControl>
											<RadioGroupItem value="BEGINNER" />
										</FormControl>
										<FormLabel>Beginner</FormLabel>
									</FormItem>
									<FormItem>
										<FormControl>
											<RadioGroupItem value="INTERMEDIATE" />
										</FormControl>
										<FormLabel>Intermediate</FormLabel>
									</FormItem>
									<FormItem>
										<FormControl>
											<RadioGroupItem value="PROFICIENT" />
										</FormControl>
										<FormLabel>Proficient</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="image"
					render={({ field: { value, onChange, ...fieldProps } }) => (
						<FormItem>
							<FormLabel>Image</FormLabel>
							{value instanceof File ? (
								<img
									src={URL.createObjectURL(value)}
									alt="img"
								/>
							) : (
								<img
									src={value}
									alt="img"
								/>
							)}
							<FormControl>
								<Input
									type="file"
									// accept="image/*"
									// value={value}
									onChange={(event) => onChange(event.target.files?.[0])}
									{...fieldProps}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type="submit">Done</Button>
			</form>
		</Form>
	)
}

export default EditProfileForm
