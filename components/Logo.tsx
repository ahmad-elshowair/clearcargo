import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
	return (
		<div className="flex flex-col leading-none items-start">
			<Image
				src={
					"https://mcqcttzcvnupvxeptsyf.supabase.co/storage/v1/object/public/ClreaCargo/images/ClearCargo-logo.png"
				}
				width={170}
				height={30}
				alt="ClearCargo Logo"
				className="w-[120px] h-[80px]"
			/>
			<h1 className={`text-[40px] font-bold text-neutral-900 -mt-2`}>
				<Link href="/">
					<span className="text-[#07BE52]">Clear</span>Cargo
				</Link>
			</h1>
		</div>
	);
};
