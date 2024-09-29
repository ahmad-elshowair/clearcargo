import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Port } from "@/types/port";

export const fetchAllPorts = async () => {
	const supabase = await createSupabaseServerClient();

	try {
		const { data, error } = await supabase.from("ports").select("*");
		if (error) {
			console.error("ERROR FETCHING PORTS: ", error);
			return { status: "error", message: error.message, data: null };
		}

		const ports = data as Port[];

		return {
			status: "success",
			message: "SUCCESSFULLY FETCHED PORTS",
			data: ports,
		};
	} catch (error) {
		console.error("ERROR FETCHING PORTS: ", error);
		return { status: "error", message: error, data: null };
	}
};
