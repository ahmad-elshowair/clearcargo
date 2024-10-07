import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export const Logo = ({ fontSize }: { fontSize?: string }) => {
	return (
		<div className="flex md:flex-col leading-none lg:items-start items-center">
			<Image
				src={
					"https://dwxqnygcejwrtodsggza.supabase.co/storage/v1/object/public/ClearCargo/images/ClearCargo-logo.png"
				}
				width={170}
				height={30}
				alt="ClearCargo Logo"
				className="w-[120px] h-[80px]"
			/>
			<h1 className={clsx(fontSize, "font-bold text-neutral-900")}>
				<Link href="/" className="hidden md:inline-block">
					<span className="text-[#07BE52]">Clear</span>Cargo
				</Link>
			</h1>
		</div>
	);
};
