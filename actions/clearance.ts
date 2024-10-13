"use server";
import { deleteFile } from "@/lib/deleteFile";
import { sendEmailNotification } from "@/lib/email";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { uploadFileServer } from "@/lib/uploadFile";
import {
	TClearance,
	TClearanceResult,
	TClearanceTable,
	TFilteredClearanceResult,
} from "@/types/clearance";
import { UserType } from "@/types/user";
import { revalidatePath } from "next/cache";

import { fetchAllAdmins } from "./admin";

const CLEARANCES_PER_PAGE = 10;

const supabaseAdmin = createSupabaseAdminClient();

// FETCH ALL CLEARANCES OF THE LOGGED IN USER
export const fetchUserFilteredClearances = async (
	query: string = "",
	page: number = 1,
	limit: number = CLEARANCES_PER_PAGE,
	sortColumn: string = "created_at",
	sortDirection: "ASC" | "DESC" = "DESC",
): Promise<TFilteredClearanceResult> => {
	try {
		const supabase = await createSupabaseServerClient();

		const { data, error } = await supabase.rpc(
			"fetch_user_filtered_clearances",
			{
				p_query: query,
				p_page: page,
				p_limit: limit,
				p_sort_column: sortColumn,
				p_sort_direction: sortDirection,
			},
		);

		if (error) {
			console.error("ERROR", error.message);
			return {
				status: "error",
				message: error.message,
			};
		}

		const clearances = data as TClearanceTable[];
		const totalCount = clearances.length > 0 ? Number(data[0].total_count) : 0;
		const totalPages = Math.ceil(totalCount / limit);

		return {
			status: "success",
			message: "Clearances fetched successfully",
			data: clearances,
			currentPage: page,
			totalPages: totalPages,
		};
	} catch (error) {
		console.error("ERROR FETCHING USER FILTERED CLEARANCES", error);
		return {
			status: "error",
			message: (error as Error).message,
		};
	}
};

// FETCH ALL CLEARANCES
export const fetchFilteredClearances = async (
	query: string = "",
	page: number = 1,
	limit: number = CLEARANCES_PER_PAGE,
	sortColumn: string = "created_at",
	sortDirection: "ASC" | "DESC" = "DESC",
): Promise<TFilteredClearanceResult> => {
	try {
		const { data, error } = await supabaseAdmin.rpc(
			"fetch_filtered_clearances",
			{
				p_query: query,
				p_page: page,
				p_limit: limit,
				p_sort_column: sortColumn,
				p_sort_direction: sortDirection,
			},
		);

		if (error) {
			console.error("ERROR FETCHING FILTERED CLEARANCES", error.message);
			return {
				status: "error",
				message: error.message,
			};
		}
		const clearances = data as TClearanceTable[];
		const totalCount = clearances.length > 0 ? Number(data[0].total_count) : 0;
		const totalPages = Math.ceil(totalCount / limit);

		return {
			status: "success",
			message: "Clearances fetched successfully",
			data: clearances,
			currentPage: page,
			totalPages: totalPages,
		};
	} catch (error) {
		console.error("ERROR FETCHING FILTERED CLEARANCES", error);
		return {
			status: "error",
			message: (error as Error).message,
		};
	}
};

// Define FileField and ClearanceField
type FileField = "invoice" | "vat_receipt" | "loading_bill";
type ClearanceField = FileField | "arrival_date" | "is_vat_paid" | "port_id";

const isClearanceField = (key: string): key is ClearanceField => {
	return [
		"invoice",
		"vat_receipt",
		"loading_bill",
		"arrival_date",
		"is_vat_paid",
		"port_id",
	].includes(key);
};

// CREATE A NEW CLEARANCE
export const createClearance = async (formData: FormData) => {
	try {
		const supabase = await createSupabaseServerClient();

		// GET THE USER ID OF THE LOGGED IN USER
		const { data: user, error: userError } = await supabase.auth.getUser();

		if (userError) {
			console.error("ERROR GETTING USER ID", userError.message);
			return {
				status: "error",
				message: userError.message,
			};
		}

		if (!user) {
			return {
				status: "error",
				message: "USER NOT AUTHENTICATED",
			};
		}

		// GET THE USER ID
		const user_id = user.user.id;

		// INITIALIZE THE CLEARANCE DATA OBJECT
		const createData: Partial<TClearance> = {};

		// PARSE THE ARRIVAL DATE
		for (const [key, value] of formData.entries()) {
			if (!isClearanceField(key)) {
				console.warn(`WARNING: UNKNOWN FORM DATA KEY: ${key}`);
				continue;
			}
			if (value instanceof File && value.size > 0) {
				const folder =
					key === "invoice"
						? "invoices"
						: key === "loading_bill"
						? "loading_bills"
						: "vat_receipts";
				const uploadResponse = await uploadFileServer(value, folder);

				if (uploadResponse.status === "error") {
					console.error("ERROR UPLOADING FILE", uploadResponse.message);
					return {
						status: "error",
						message: uploadResponse.message,
					};
				}
				createData[key as FileField] = uploadResponse.url;
			} else if (key === "arrival_date") {
				createData[key] = new Date(value as string).toISOString();
			} else if (key === "is_vat_paid") {
				createData[key] = value === "true";
			} else if (key === "port_id") {
				createData[key] = String(value);
			} else {
				console.warn(`WARNING: UNKNOWN FORM DATA KEY: ${key}`);
			}
		}

		createData.created_by = user_id;
		// CREATE THE CLEARANCE IN SUPABASE
		const { data: createdClearance, error: clearanceError } =
			await supabase.rpc("create_clearance", {
				clearance_data: createData,
			});

		if (clearanceError) {
			console.error("ERROR CREATING CLEARANCE", clearanceError.message);
			return {
				status: "error",
				message: clearanceError.message,
			};
		}

		// FETCH ALL ADMINS' EMAILS.
		const adminResult = await fetchAllAdmins();
		if (adminResult.status === "error") {
			console.error("ERROR FETCHING ADMINS' EMAILS", adminResult.message);
			return {
				status: "error",
				message: adminResult.message,
			};
		}

		const adminEmails = adminResult.data
			? adminResult.data.map((admin) => admin.email)
			: [];

		const emailResult = await sendEmailNotification(
			adminEmails,
			createdClearance,
		);

		if (emailResult.status === "error") {
			console.error("ERROR SENDING EMAIL NOTIFICATION", emailResult.message);
			return {
				status: "error",
				message: emailResult.message,
			};
		}

		// SEND EMAIL NOTIFICATION TO ALL ADMINS

		return {
			status: "success",
			message: "CLEARANCE CREATED SUCCESSFULLY",
			data: createData as TClearance,
		};
	} catch (error) {
		console.error("ERROR CREATING CLEARANCE", error);
		return {
			status: "error",
			message: (error as Error).message,
		};
	}
};

// FETCH A CLEARANCE BY ID
export const fetchClearanceById = async (
	id: string,
): Promise<TClearanceResult> => {
	try {
		const supabase = await createSupabaseServerClient();

		const { data, error } = await supabase
			.from("clearances")
			.select("*")
			.eq("id", id)
			.maybeSingle();

		if (error) {
			console.error("ERROR FETCHING CLEARANCE BY ID", error.message);
			return {
				status: "error",
				message: error.message,
				data: null,
			};
		}

		const clearance = data[0] as TClearance;
		return {
			status: "success",
			message: "CLEARANCE FETCHED SUCCESSFULLY",
			data: clearance,
		};
	} catch (error) {
		console.error("ERROR FETCHING CLEARANCE BY ID", error);
		return {
			status: "error",
			message: (error as Error).message,
			data: null,
		};
	}
};

// DELETE A CLEARANCE BY ID

export const deleteClearance = async (
	id: string,
	link?: string,
): Promise<TClearanceResult> => {
	try {
		if (!id) {
			return {
				status: "error",
				message: "CLEARANCE ID NOT PROVIDED",
				data: null,
			};
		}
		const supabase = await createSupabaseServerClient();

		// FETCH THE CLEARANCE TO BE DELETED
		const clearanceResult = await fetchClearanceById(id);

		if (clearanceResult.status === "error") {
			console.error("ERROR FETCHING CLEARANCE", clearanceResult.message);
			return {
				status: "error",
				message: clearanceResult.message,
				data: null,
			};
		}
		const clearance = clearanceResult.data;

		// GET THE LOGGED IN USER
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser();

		// RETURN ERROR IF FAILED TO GET THE USER
		if (userError) {
			console.error("ERROR GETTING USER ID", userError.message);
			return {
				status: "error",
				message: userError.message,
				data: null,
			};
		}

		if (!user) {
			return {
				status: "error",
				message: "USER NOT AUTHENTICATED",
				data: null,
			};
		}

		const user_type: UserType = user.user_metadata.type;
		const user_id = user.id;

		// CHECK IF THE USER IS AN ADMIN OR THE OWNER OF THE CLEARANCE
		if (user_type === "admin" || clearance?.created_by === user_id) {
			// DELETE THE CLEARANCE IN SUPABASE
			const { error: clearanceError } = await supabase
				.from("clearances")
				.delete()
				.match({ id });

			if (clearanceError) {
				console.error("ERROR DELETING CLEARANCE", clearanceError.message);
				return {
					status: "error",
					message: clearanceError.message,
					data: null,
				};
			}

			if (link) {
				revalidatePath(`${link}`);
			}
			return {
				status: "success",
				message: "CLEARANCE DELETED SUCCESSFULLY",
				data: clearance,
			};
		} else {
			console.error("ERROR: USER IS NOT AUTHORIZED TO DELETE THIS CLEARANCE");
			return {
				status: "error",
				message: "USER IS NOT AUTHORIZED TO DELETE THIS CLEARANCE",
				data: null,
			};
		}
	} catch (error) {
		console.error("ERROR DELETING CLEARANCE", error);
		return {
			status: "error",
			message: (error as Error).message,
			data: null,
		};
	}
};

// UPDATE A CLEARANCE
export const updateClearance = async (
	id: string,
	formData: FormData,
): Promise<TClearanceResult> => {
	try {
		const supabase = await createSupabaseServerClient();

		// FETCH THE CLEARANCE TO BE UPDATED
		const currentClearanceResult = await fetchClearanceById(id);

		if (currentClearanceResult.status === "error") {
			console.error("ERROR FETCHING CLEARANCE", currentClearanceResult.message);
			return {
				status: "error",
				message: currentClearanceResult.message,
				data: null,
			};
		}

		const currentClearance = currentClearanceResult.data;

		// GET THE LOGGED IN USER
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser();

		// RETURN ERROR IF FAILED TO GET THE USER
		if (userError) {
			console.error("ERROR GETTING USER ID", userError.message);
			return {
				status: "error",
				message: userError.message,
				data: null,
			};
		}

		if (!user) {
			return {
				status: "error",
				message: "USER NOT AUTHENTICATED",
				data: null,
			};
		}

		const user_type: UserType = user.user_metadata.type as "admin" | "customer";
		const user_id = user.id;

		// CHECK AUTHORIZATION
		if (user_type !== "admin" && currentClearance?.created_by !== user_id) {
			console.error("ERROR: USER IS NOT AUTHORIZED TO UPDATE THIS CLEARANCE");
			return {
				status: "error",
				message: "USER IS NOT AUTHORIZED TO UPDATE THIS CLEARANCE",
				data: null,
			};
		}

		// PREPARE THE UPDATED DATA.
		const updatedData: Partial<TClearance> = {};

		const filesFields: FileField[] = ["invoice", "vat_receipt", "loading_bill"];

		// PROCESS FORM DATA.
		for (const [key, value] of formData.entries()) {
			if (filesFields.includes(key as FileField)) {
				if (value instanceof File && value.size > 0) {
					const folder =
						key === "invoice"
							? "invoices"
							: key === "loading_bill"
							? "loading_bills"
							: "vat_receipts";
					const uploadResponse = await uploadFileServer(value, folder);
					if (uploadResponse.status === "error") {
						console.error("ERROR UPLOADING FILE", uploadResponse.message);
						return {
							status: "error",
							message: uploadResponse.message,
							data: null,
						};
					}
					updatedData[key as FileField] = uploadResponse.url;

					// DELETE THE OLD FILES IF IT EXISTS.
					const oldFileUrl = currentClearance?.[key as FileField];
					if (oldFileUrl) {
						const deleteResponse = await deleteFile(oldFileUrl, folder);
						if (deleteResponse.status === "error") {
							console.warn("ERROR DELETING OLD FILE", deleteResponse.message);
						}
					}
				}
			} else if (key === "arrival_date") {
				updatedData[key] = new Date(value as string).toISOString();
			} else if (key === "is_vat_paid") {
				updatedData.is_vat_paid = value === "true";
			} else if (key === "port_id") {
				updatedData[key] = value as string;
			} else {
				console.warn(`Ignored unknown field: ${key}`);
			}
		}

		// UPDATE THE CLEARANCE IN SUPABASE
		const { data: updatedClearance, error: clearanceError } = await supabase
			.from("clearances")
			.update(updatedData)
			.eq("id", id)
			.maybeSingle();

		if (clearanceError) {
			console.error("ERROR UPDATING CLEARANCE", clearanceError.message);
			return {
				status: "error",
				message: clearanceError.message,
				data: null,
			};
		}

		return {
			status: "success",
			message: "CLEARANCE UPDATED SUCCESSFULLY",
			data: updatedClearance,
		};
	} catch (error) {
		console.error("ERROR UPDATING CLEARANCE", error);
		return {
			status: "error",
			message: (error as Error).message,
			data: null,
		};
	}
};
