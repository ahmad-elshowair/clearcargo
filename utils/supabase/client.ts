import configs from "@/configs/config";
import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
	return createBrowserClient(configs.supabaseUrl, configs.supabaseAnonKey);
}
