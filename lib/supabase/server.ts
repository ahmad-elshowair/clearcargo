"use server";
import configs from "@/configs/config";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
	const cookieStore = cookies();

	return createServerClient(configs.supabaseUrl, configs.supabaseAnonKey, {
		cookies: {
			getAll() {
				return cookieStore.getAll();
			},
			setAll(cookiesToSet) {
				try {
					cookiesToSet.forEach(({ name, value, options }) =>
						cookieStore.set(name, value, options),
					);
				} catch (error) {
					console.error("Error setting cookies:", error);
				}
			},
		},
	});
}
