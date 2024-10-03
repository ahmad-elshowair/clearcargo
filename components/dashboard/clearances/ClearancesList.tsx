"use client";
import DeleteModal from "@/components/DeleteModal";
import { Button } from "@/components/ui/button";
import { TClearanceTable } from "@/types/clearance";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPencil } from "react-icons/fa6";
import { MdOutlinePaid, MdPaid } from "react-icons/md";
import Clearance from "./Clearance";

const ClearancesList = ({
	clearances,
}: {
	clearances: TClearanceTable[] | undefined;
}) => {
	const pathname = usePathname();
	console.log("the pathname is ", pathname);

	return (
		<section className="mt-6 flow-root">
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-green-100 p-2 md:mt-0">
					<div className="lg:hidden">
						{clearances && clearances?.length > 0 ? (
							clearances.map((clearance: TClearanceTable, index) => (
								<Clearance key={index} clearance={clearance} link={pathname} />
							))
						) : (
							<p className="text-4xl text-center text-red-100 border rounded-md p-4 bg-red-200">
								No Clearances Found
							</p>
						)}
					</div>
					{clearances && clearances.length > 0 ? (
						<table className="hidden lg:table min-w-full text-gray-900">
							<thead className="rounded-lg text-left text-sm font-medium">
								<tr>
									{pathname === "/dashboard/all-clearances" && (
										<th scope="col" className="px-4 py-5 font-medium">
											Customer
										</th>
									)}
									<th scope="col" className="px-4 py-5 font-medium">
										Arrival Port
									</th>

									<th scope="col" className="px-4 py-5 font-medium">
										Arrival Date
									</th>
									<th scope="col" className="px-4 py-5 font-medium">
										Invoice
									</th>
									<th scope="col" className="px-4 py-5 font-medium">
										VAT Paid?
									</th>
									<th scope="col" className="px-4 py-5 font-medium">
										VAT Receipt
									</th>
									<th scope="col" className="px-4 py-5 font-medium">
										Loading Bil
									</th>
									<th scope="col" className="px-4 py-5 font-medium">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="bg-white">
								{clearances.map((clearance, index) => (
									<tr
										key={index}
										className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
										{pathname === "/dashboard/all-clearances" && (
											<td className="py-3 pl-6 pr-3 whitespace-nowrap">
												<div className="flex items-center gap-2">
													<Image
														src={
															"https://dwxqnygcejwrtodsggza.supabase.co/storage/v1/object/public/ClearCargo/images/avatar.png"
														}
														height={40}
														width={40}
														alt={`${clearance.first_name}'s profile avatar`}
														className="rounded-2xl"
													/>
													<div className="flex flex-col">
														<p className="text-sm font-medium">
															{clearance.first_name} {clearance.surname}
														</p>
														<p className="text-xs text-gray-500">
															{clearance.email}
														</p>
													</div>
												</div>
											</td>
										)}
										<td className="p-3 whitespace-nowrap text-sm">
											{clearance.port_name}
										</td>
										<td className="p-3 whitespace-nowrap text-sm">
											{clearance.arrival_date.toString().slice(0, 10)}
										</td>
										<td className="p-3 whitespace-nowrap text-sm">
											{clearance.invoice ? (
												<div className="flex gap-2">
													<Link
														href={clearance.invoice}
														target="_blank"
														rel="noopener noreferrer"
														className="text-sm text-blue-500 hover:text-blue-700">
														View Invoice
													</Link>
												</div>
											) : (
												"N/A"
											)}
										</td>
										<td className="p-3 whitespace-nowrap text-sm">
											{clearance.is_vat_paid ? (
												<div className="text-green-500 flex items-center gap-3">
													<span className="text-green-500">Yes</span>
													<MdPaid className="h-6 w-6" />
												</div>
											) : (
												<div className="text-red-500 flex gap-3 items-center">
													<span>No</span>
													<MdOutlinePaid className="w-6 h-6" />
												</div>
											)}
										</td>
										<td className="p-3 whitespace-nowrap text-sm">
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
										</td>
										<td className="p-3 whitespace-nowrap text-sm">
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
										</td>
										<td className="whitespace-nowrap px-3">
											<div className="flex items-center gap-3">
												{pathname === "/dashboard/all-clearances" && (
													<Link
														href={`/dashboard/clearances/${clearance.clearance_id}/edit`}>
														<Button className="bg-green-500 hover:bg-green-700 text-white font-bold">
															<FaPencil />
														</Button>
													</Link>
												)}
												<DeleteModal
													id={clearance.clearance_id}
													label="clearance"
													link={pathname}
												/>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<section className="w-full justify-center items-center hidden lg:flex">
							<p className="text-4xl text-red-100 border rounded-md p-4 bg-red-200">
								No Clearances Found or you have not yet added any clearances.
							</p>
						</section>
					)}
				</div>
			</div>
		</section>
	);
};

export default ClearancesList;
