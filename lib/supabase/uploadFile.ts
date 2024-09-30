import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { v4 as uuidv4 } from "uuid";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/jpg",
	"application/pdf",
];

export const uploadFile = async (file: File, folder: string) => {
	try {
		if (!file) {
			console.error("No file provided");
			return {
				status: "error",
				message: "No file provided",
				url: null,
			};
		}
		if (file.size > MAX_FILE_SIZE) {
			console.error("File size exceeds maximum limit of 5MB");
			return {
				status: "error",
				message: "File size exceeds maximum limit of 5MB",
				url: null,
			};
		}

		if (!ALLOWED_FILE_TYPES.includes(file.type)) {
			console.error(
				"Invalid file type. Only PDF, JPEG, JPG, and PNG are allowed",
			);
			return {
				status: "error",
				message: "Invalid file type. Only PDF, JPEG, JPG, and PNG are allowed",
				url: null,
			};
		}
		const supabase = createSupabaseBrowserClient();
		console.log("Supabase client created successfully");

		const fileEXT = file.name.split(".").pop();
		const fileName = `${folder}/${uuidv4()}.${fileEXT}`;

		console.log("Attempting to upload file:", fileName);
		const { data: uploadData, error } = await supabase.storage
			.from("ClearCargo")
			.upload(fileName, file, { cacheControl: "3600", upsert: false });

		if (error) {
			console.error("ERROR UPLOADING FILE: ", error);
			return {
				status: "error",
				message: error.message,
				url: null,
			};
		}

		console.log("data of uploading file: ", uploadData);

		const { data: publicUrlData } = supabase.storage
			.from("ClearCargo")
			.getPublicUrl(fileName);

		return {
			status: "success",
			message: "FILE UPLOADED SUCCESSFULLY",
			url: publicUrlData.publicUrl,
		};
	} catch (error) {
		console.error("ERROR UPLOADING FILE: ", error);
		return {
			status: "error",
			message: (error as Error).message,
			url: null,
		};
	}
};
