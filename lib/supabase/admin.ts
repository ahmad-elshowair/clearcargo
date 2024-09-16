import configs from "@/configs/config";
import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
	return createClient(configs.supabaseUrl, configs.supabaseServiceRoleKey);
}
