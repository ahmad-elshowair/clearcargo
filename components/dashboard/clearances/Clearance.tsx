"use client";
import DeleteModal from "@/components/DeleteModal";
import { Button } from "@/components/ui/button";
import { TClearanceTable } from "@/types/clearance";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPencil } from "react-icons/fa6";
import { MdOutlinePaid, MdPaid } from "react-icons/md";

const Clearance = ({
	clearance,
	link,
}: {
	clearance: TClearanceTable;
	link: string;
}) => {
	const pathname = usePathname();
	return (
		<section className="mb-2 w-full rounded-md bg-white p-4">
			<section className="flex items-center justify-between border-b pb-4">
				{pathname === "/dashboard/all-clearances" && (
					<div className="flex items-center gap-2">
						<Image
							src={
								"https://dwxqnygcejwrtodsggza.supabase.co/storage/v1/object/public/ClearCargo/images/avatar.png"
							}
							height={38}
							width={38}
							className="rounded-lg w-8 h-8 md:w-10 md:h-10"
							alt="profile picture"
						/>
						<div className="flex flex-col">
							<h2 className="text-sm md:text-lg font-bold">{`${clearance.first_name} ${clearance.surname}`}</h2>
							<span className="text-[8px] md:text-xs text-gray-500">
								{clearance.email}
							</span>
						</div>
					</div>
				)}

				<div className="flex justify-end gap-2">
					{pathname === "/dashboard/all-clearances" && (
						<Link href={`/dashboard/clearances/${clearance.clearance_id}/edit`}>
							<Button className="bg-transparent text-green-600 hover:text-green-50 hover:bg-green-600 px-2 border border-green-600 h-fit">
								<FaPencil className="w-5" />
							</Button>
						</Link>
					)}
					<DeleteModal
						id={clearance.clearance_id}
						label="Clearance"
						link={link}
					/>
				</div>
			</section>

			<section className="grid w-full grid-cols-2 md:grid-cols-3 gap-4 pt-4">
				<div className="flex flex-col items-center">
					<span className="text-xs text-gray-500">VAT Paid</span>
					{clearance.is_vat_paid ? (
						<div className="flex gap-2 text-green-500">
							<span>YES</span>
							<MdPaid className="h-6 w-6" />
						</div>
					) : (
						<div className="flex gap-2 text-red-400">
							<span>NO</span>
							<MdOutlinePaid className="w-6 h-6" />
						</div>
					)}
				</div>
				<div className="flex flex-col items-center">
					<span className="text-xs text-gray-500">VAT Receipt</span>

					{clearance.vat_receipt ? (
						<Link
							href={clearance.vat_receipt}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 hover:text-blue-700">
							View Receipt
						</Link>
					) : (
						"N/A"
					)}
				</div>
				<div className="flex flex-col items-center">
					<span className="text-xs text-gray-500">Loading Bill</span>
					{clearance.loading_bill ? (
						<Link
							href={clearance.loading_bill}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 hover:text-blue-700">
							View Bill
						</Link>
					) : (
						"N/A"
					)}
				</div>

				<div className="flex flex-col items-center">
					<span className="text-xs text-gray-500">Invoice</span>
					{clearance.invoice ? (
						<Link
							href={clearance.invoice}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 hover:text-blue-700">
							View Invoice
						</Link>
					) : (
						"N/A"
					)}
				</div>
				<div className="flex flex-col items-center">
					<span className="text-xs text-gray-500">Arrival Port</span>
					<p className="text-xl font-medium">{clearance.port_name}</p>
				</div>
				<div className="flex flex-col items-center">
					<span className="text-xs text-gray-500">Arrival Date</span>
					<span className="text-lg font-semibold md:font-bold">
						{clearance.arrival_date.toString().slice(0, 10)}
					</span>
				</div>
			</section>
		</section>
	);
};

export default Clearance;
