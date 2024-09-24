import configs from "@/configs/config";
import { createClient } from "@supabase/supabase-js";

export const createAdminClient = () =>
	createClient(configs.supabaseUrl, configs.supabaseServiceRoleKey);
