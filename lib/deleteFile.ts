import { createSupabaseAdminClient } from "./supabase/admin";

export const deleteFile = async (fileUrl: string, folder: string) => {
	try {
		const supabase = createSupabaseAdminClient();

		// EXTRACT THE FILE PATH FROM THE URL
		const urlParts = fileUrl.split("/");
		const fileName = urlParts[urlParts.length - 1];
		const filePath = `${folder}/${fileName}`;

		const { data, error } = await supabase.storage
			.from("ClearCargo")
			.remove([filePath]);
		if (error) {
			console.error("ERROR DELETING FILE: ", error);
			return {
				status: "error",
				message: error.message,
			};
		}

		if (data && data.length > 0) {
			return {
				status: "success",
				message: "File deleted successfully",
			};
		} else {
			return {
				status: "error",
				message: "File not found or already deleted",
			};
		}
	} catch (error) {
		console.error("ERROR DELETING FILE: ", error);
		return {
			status: "error",
			message: (error as Error).message,
		};
	}
};
