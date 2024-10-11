import { v4 as uuidv4 } from "uuid";
import { createSupabaseServerClient } from "./supabase/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/jpg",
	"application/pdf",
];

export const uploadFileServer = async (
	file: File,
	folder: "invoices" | "loading_bills" | "vat_receipts",
) => {
	try {
		if (!file) {
			console.error("No file provided");
			return {
				status: "error",
				message: "No file provided",
			};
		}
		if (file.size > MAX_FILE_SIZE) {
			console.error("File size exceeds maximum limit of 5MB");
			return {
				status: "error",
				message: "File size exceeds maximum limit of 5MB",
			};
		}

		if (!ALLOWED_FILE_TYPES.includes(file.type)) {
			console.error(
				"Invalid file type. Only PDF, JPEG, JPG, and PNG are allowed",
			);
			return {
				status: "error",
				message: "Invalid file type. Only PDF, JPEG, JPG, and PNG are allowed",
			};
		}

		// Use the Admin client for server-side operations
		const supabase = await createSupabaseServerClient();

		const fileEXT = file.name.split(".").pop();
		const fileName = `${folder}/${uuidv4()}.${fileEXT}`;

		const { error } = await supabase.storage
			.from("ClearCargo")
			.upload(fileName, file, { cacheControl: "3600", upsert: false });

		if (error) {
			console.error("ERROR UPLOADING FILE: ", error);
			return {
				status: "error",
				message: error.message,
			};
		}

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
		};
	}
};
