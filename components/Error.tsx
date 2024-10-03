"use client";
import { useSearchParams } from "next/navigation";

const Error = () => {
	// USE NEXT.JS HOOK TO GET SEARCH PARAMS FROM THE URL
	const searchParams = useSearchParams();
	const errorMessage =
		searchParams.get("message") || "An unexpected error occurred";

	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center">
				<h1 className="text-2xl font-bold text-red-600 mb-4">
					SORRY, SOMETHING WENT WRONG
				</h1>
				<p className="text-gray-700">{decodeURIComponent(errorMessage)}</p>
			</div>
		</div>
	);
};

export default Error;
