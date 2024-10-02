"use server";

import { sendEmailNotification } from "@/lib/email";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { TClearance, TClearanceTable } from "@/types/clearance";
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
) => {
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
				data: null,
			};
		}

		const clearances = data as TClearanceTable[];

		const totalCount =
			clearances.length > 0 ? Number(clearances[0].total_count) : 0;
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
			data: null,
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
) => {
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
				data: null,
			};
		}

		const clearances = data as TClearanceTable[];

		const totalCount =
			clearances.length > 0 ? Number(clearances[0].total_count) : 0;
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
			data: null,
		};
	}
};

// CREATE A NEW CLEARANCE
export const createClearance = async (clearance: TClearance) => {
	try {
		const supabase = await createSupabaseServerClient();

		// GET THE USER ID OF THE LOGGED IN USER
		const { data: user, error: userError } = await supabase.auth.getUser();

		if (userError) {
			console.error("ERROR GETTING USER ID", userError.message);
			return {
				status: "error",
				message: userError.message,
				data: null,
			};
		}

		// CREATE THE CLEARANCE IN SUPABASE
		const { data: clearanceData, error } = await supabase.rpc(
			"create_clearance",
			{
				clearance_data: {
					...clearance,
					arrival_date: new Date(clearance.arrival_date).toISOString(),
					created_by: user.user.id,
				},
			},
		);

		if (error) {
			console.error("ERROR CREATING CLEARANCE", error.message);
			return {
				status: "error",
				message: error.message,
				data: null,
			};
		}

		console.log("clearance created:", clearanceData);

		// FETCH ALL ADMINS' EMAILS.
		const adminResult = await fetchAllAdmins();
		if (adminResult.status === "error") {
			console.error("ERROR FETCHING ADMINS' EMAILS", adminResult.message);
			return {
				status: "error",
				message: adminResult.message,
				data: null,
			};
		}

		const adminEmails = adminResult.data
			? adminResult.data.map((admin) => admin.email)
			: [];

		const emailResult = await sendEmailNotification(adminEmails, clearanceData);

		if (emailResult.status === "error") {
			console.error("ERROR SENDING EMAIL NOTIFICATION", emailResult.message);
			return {
				status: "error",
				message: emailResult.message,
				data: null,
			};
		}

		// SEND EMAIL NOTIFICATION TO ALL ADMINS

		return {
			status: "success",
			message: "CLEARANCE CREATED SUCCESSFULLY",
			data: clearanceData as TClearance,
		};
	} catch (error) {
		console.error("ERROR CREATING CLEARANCE", error);
		return {
			status: "error",
			message: (error as Error).message,
			data: null,
		};
	}
};

// FETCH A CLEARANCE BY ID
export const fetchClearanceById = async (id: string) => {
	try {
		const supabase = await createSupabaseServerClient();

		const { data, error } = await supabase
			.from("clearances")
			.select("*")
			.eq("id", id);

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

// DELETE A CLEARANCE
export const deleteClearance = async (id: string) => {
	try {
		const supabase = await createSupabaseServerClient();

		// FETCH THE DELETED CLEARANCE
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
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser();

		if (userError) {
			console.error("ERROR GETTING USER ID", userError.message);
			return {
				status: "error",
				message: userError.message,
				data: null,
			};
		}

		const userType = user?.user_metadata.type as "admin" | "customer";

		const user_id = user?.id;

		// CHECK IF THE USER IS AN ADMIN OR A CUSTOMER
		if (userType === "customer" && clearance?.created_by !== user_id) {
			console.error("ERROR: USER IS NOT AUTHORIZED TO DELETE THIS CLEARANCE");
			return {
				status: "error",
				message: "USER IS NOT AUTHORIZED TO DELETE THIS CLEARANCE",
				data: null,
			};
		}

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
			};
		}

		return {
			status: "success",
			message: "CLEARANCE DELETED SUCCESSFULLY",
		};
	} catch (error) {
		console.error("ERROR DELETING CLEARANCE", error);
		return {
			status: "error",
			message: (error as Error).message,
		};
	}
};
