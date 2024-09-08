/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "mcqcttzcvnupvxeptsyf.supabase.co",
			},
		],
	},
};

export default nextConfig;
