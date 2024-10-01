"use server";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { TClearance, TClearanceTable } from "@/types/clearance";

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

		console.log("all clearances of the user are:", clearances);

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

		console.log("all clearances are:", clearances);

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
		const { data, error } = await supabase.rpc("create_clearance", {
			clearance_data: {
				...clearance,
				arrival_date: new Date(clearance.arrival_date).toISOString(),
				created_by: user.user.id,
			},
		});

		if (error) {
			console.error("ERROR CREATING CLEARANCE", error.message);
			return {
				status: "error",
				message: error.message,
				data: null,
			};
		}

		console.log("clearance created:", data);

		return {
			status: "success",
			message: "CLEARANCE CREATED SUCCESSFULLY",
			data: data,
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
