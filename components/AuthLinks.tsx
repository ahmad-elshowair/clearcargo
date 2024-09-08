"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
	FaArrowRightFromBracket,
	FaArrowRightToBracket,
	FaUserPlus,
} from "react-icons/fa6";

const AuthLinks = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
	const router = useRouter();
	const pathname = usePathname();
	const handleLogout = async () => {
		router.push("/login");
	};
	return (
		<>
			{isLoggedIn ? (
				<button
					onClick={handleLogout}
					className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-semibold lg:flex-none md:justify-start md:p-2 md:px-3 shadow hover:bg-green-500 text-[#2A3940] bg-emerald-100 hover:text-green-50 duration-200 ease-in-out">
					<FaArrowRightFromBracket className="w-6" />
					<span className="sm:hidden lg:block">Sign out</span>
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
						<span className="sm:hidden lg:block">Login</span>
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
