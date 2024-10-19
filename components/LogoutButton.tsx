"use client";
import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const LogoutButton = () => {
	const router = useRouter();

	const handleLogout = async () => {
		const result = await logout();

		if (result.status === "success") {
			alert(result.message);
			// toast({
			// 	title: <h1 className="font-extrabold text-lg">Logout Success</h1>,
			// 	description: (
			// 		<div className="bg-green-100 p-4 rounded-md w-[350px]">
			// 			<p className="text-md font-bold text-green-500">{result.message}</p>
			// 		</div>
			// 	),
			// 	duration: 5000,
			// 	style: {
			// 		background: "#2d393fab",
			// 		color: "white",
			// 		fontWeight: "800",
			// 		border: "none",
			// 	},
			// });
			router.refresh(); // Refresh the page to update the UI
		} else {
			console.error("Failed to log out:", result.message);
			alert(result.message);
			// toast({
			// 	title: <h1 className="font-extrabold text-lg">Logout Error</h1>,
			// 	description: (
			// 		<div className="bg-red-100 p-4 rounded-md w-[350px]">
			// 			<p className="text-md font-bold text-red-500">{result.message}</p>
			// 		</div>
			// 	),
			// 	duration: 5000,
			// 	style: {
			// 		background: "#cea9a9",
			// 		color: "white",
			// 		border: "none",
			// 		fontWeight: "800",
			// 	},
			// });
		}
	};
	return (
		<Button
			onClick={handleLogout}
			className="text-white bg-green-500 hover:bg-green-600 h-12 w-40 font-bold text-lg">
			Logout
		</Button>
	);
};

export default LogoutButton;
