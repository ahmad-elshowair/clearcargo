import { createSupabaseAdminClient } from "./supabase/admin";

export const deleteFile = async (
	fileUrl: string,
	folder: "invoices" | "loading_bills" | "vat_receipts",
) => {
	try {
		const supabase = createSupabaseAdminClient();
		const fullPath = `${folder}/${fileUrl}`;

		const { data, error } = await supabase.storage
			.from("clearcargo")
			.remove([fullPath]);
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
				message: "File not found",
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
