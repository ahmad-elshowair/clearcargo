"use server";
import configs from "@/configs/config";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createSupabaseServerClient() {
	try {
		// VALIDATE SUPABASE CONFIGURATION.
		if (!configs.supabaseUrl || !configs.supabaseAnonKey) {
			console.error("Supabase URL or Anon Key is missing");
			throw new Error("Error,  Supabase configuration is missing");
		}
		const cookieStore = cookies();

		return createServerClient(configs.supabaseUrl, configs.supabaseAnonKey, {
			cookies: {
				getAll() {
					try {
						return cookieStore.getAll();
					} catch (error) {
						console.error("Error getting cookies", error);
						throw error;
					}
				},
				setAll(cookiesToSet) {
					try {
						if (!Array.isArray(cookiesToSet)) {
							throw new Error("CookiesToSet must be an array!");
						}
						cookiesToSet.forEach(({ name, value, options }) =>
							cookieStore.set(name, value, options),
						);
					} catch (error) {
						console.error("Error setting cookies", error);
						throw error;
					}
				},
			},
		});
	} catch (error) {
		console.error("Error create supabase server client:", error);
		throw error;
	}
}
