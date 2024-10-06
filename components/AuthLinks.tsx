"use client";
import { logout } from "@/actions/auth";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
	FaArrowRightFromBracket,
	FaArrowRightToBracket,
	FaUserPlus,
} from "react-icons/fa6";
import { useToast } from "./hooks/use-toast";

const AuthLinks = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
	const router = useRouter();
	const pathname = usePathname();
	const { toast } = useToast();
	const handleLogout = async () => {
		try {
			const result = await logout();
			if (result.status === "success") {
				toast({
					title: "Logout",
					description: result.message,
				});
				router.push("/login");
			} else {
				toast({
					title: "Logout",
					description: result.message,
					variant: "destructive",
				});
			}
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			{isLoggedIn ? (
				<button
					onClick={handleLogout}
					className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-semibold lg:flex-none lg:justify-start md:p-2 md:px-3 shadow hover:bg-green-500 text-[#2A3940] bg-emerald-100 hover:text-green-50 duration-200 ease-in-out">
					<FaArrowRightFromBracket className="w-6" />
					<span className="hidden sm:block">logout</span>
				</button>
			) : (
				<>
					<Link
						href={"/login"}
						className={clsx(
							"flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-semibold lg:flex-none lg:justify-start md:p-2 md:px-3 shadow hover:bg-green-500 text-[#2A3940] bg-emerald-100 hover:text-green-50  duration-200 ease-in-out",
							{
								"bg-green-500 text-orange-50": pathname === "/login",
							},
						)}>
						<FaArrowRightToBracket className="w-6 font-bold" />
						<span className="hidden sm:block">Login</span>
					</Link>
					<Link
						href={"/register"}
						className={clsx(
							"flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-semibold lg:flex-none lg:justify-start md:p-2 md:px-3 shadow hover:bg-green-500 text-[#2A3940] bg-emerald-100 hover:text-green-50  duration-200 ease-in-out",
							{
								"bg-green-500 text-orange-50": pathname === "/register",
							},
						)}>
						<FaUserPlus className="w-6 font-bold" />
						<span className="sm:hidden lg:block">Register</span>
					</Link>
				</>
			)}
		</>
	);
};

export default AuthLinks;
