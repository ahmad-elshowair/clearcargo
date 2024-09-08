"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiHomeGarage } from "react-icons/gi";
import { SiPagespeedinsights } from "react-icons/si";

const NavLinks = ({ type }: { type: "customer" | "admin" }) => {
	const pathname = usePathname();
	const links = [
		{ href: "/", label: "Home", icon: GiHomeGarage },
		{ href: "/page-1", label: "Page-1", icon: SiPagespeedinsights },
		{ href: "/page-2", label: "Page-2", icon: SiPagespeedinsights },
	];

	const filteredLinks = links.filter((link) => {
		if (!type) {
			return link.href !== "/";
		}
		if (type !== "admin" && link.href === "/page-2") {
			return false;
		}
		return true;
	});
	return (
		<>
			{filteredLinks.map((link) => {
				return (
					<Link
						href={link.href}
						key={link.label}
						className={clsx(
							"flex h-[48px] grow items-center justify-center gap-4 rounded-md p-3 md:text-sm font-semibold md:flex-none md:justify-start md:p-2 md:px-3 shadow bg-green-100 hover:bg-[#07BE52] text-[#2A3940] hover:text-green-50 duration-300 ease-in-out",
							{ "bg-[#07BE52] text-green-50": link.href === pathname },
						)}>
						<link.icon className="font-bold " />
						<span className="hidden lg:block">{link.label}</span>
					</Link>
				);
			})}
		</>
	);
};

export default NavLinks;
