/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "mcqcttzcvnupvxeptsyf.supabase.co",
			},
			{
				protocol: "https",
				hostname: "dwxqnygcejwrtodsggza.supabase.co",
			},
		],
	},
};

export default nextConfig;
