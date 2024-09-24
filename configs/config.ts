const configs = {
	supabaseUrl: String(process.env.SUPABASE_URL),
	supabaseAnonKey: String(process.env.SUPABASE_ANON_KEY),
	supabaseServiceRoleKey: String(process.env.SUPABASE_SERVICE_ROLE_KEY),
	nodeEnv: String(process.env.NODE_ENV),
	frontendUrl: String(process.env.NEXT_PUBLIC_FRONT_END_URL),
};
export default configs;
