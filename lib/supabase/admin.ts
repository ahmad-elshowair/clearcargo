import configs from "@/configs/config";
import { createClient } from "@supabase/supabase-js";

export const createSupabaseAdminClient = () =>
	createClient(configs.supabaseUrl, configs.supabaseServiceRoleKey);
