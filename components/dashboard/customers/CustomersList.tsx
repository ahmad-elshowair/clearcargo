import Customer from "@/components/dashboard/customers/Customer";
import DeleteModal from "@/components/DeleteModal";
import { Button } from "@/components/ui/button";
import { TUserTable } from "@/types/user";
import Image from "next/image";
import Link from "next/link";
import { FaPencil } from "react-icons/fa6";

const CustomersList = ({ users }: { users: TUserTable[] | null }) => {
	return (
		<section className="mt-6 flow-root">
			<div className="inline-block min-w-full align-middle">
				<div className="rounded-lg bg-green-100 p-2 md:mt-0">
					<div className="lg:hidden">
						{users ? (
							users.map((user) => <Customer key={user.id} customer={user} />)
						) : (
							<p className="text-4xl text-red-100 border rounded-md p-4 bg-red-200">
								No Customers Found
							</p>
						)}
					</div>
					<table className="hidden lg:table min-w-full text-gray-900">
						<thead className="rounded-lg text-left text-sm font-medium">
							<tr>
								<th scope="col" className="px-4 py-5 font-medium">
									Avatar
								</th>
								<th scope="col" className="px-4 py-5 font-medium">
									Full Name
								</th>

								<th scope="col" className="px-4 py-5 font-medium">
									Email
								</th>
								<th scope="col" className="px-4 py-5 font-medium">
									Type
								</th>
								<th scope="col" className="px-4 py-5 font-medium">
									Joined Since
								</th>
								<th scope="col" className="px-4 py-5 font-medium">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white">
							{users &&
								users.map((user) => (
									<tr
										className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
										key={user.id}>
										<td className="py-3 pl-6 pr-3 whitespace-nowrap">
											<Image
												src={
													"https://dwxqnygcejwrtodsggza.supabase.co/storage/v1/object/public/ClearCargo/images/avatar.png"
												}
												height={40}
												width={40}
												alt={`${user.first_name}'s profile avatar`}
												className="rounded-2xl"
											/>
										</td>
										<td className="p-3 whitespace-nowrap text-sm">{`${user.first_name} ${user.surname}`}</td>
										<td className="p-3 whitespace-nowrap text-sm">
											{user.email}
										</td>
										<td className="p-3 whitespace-nowrap text-sm">
											{user.user_type}
										</td>
										<td className="p-3 whitespace-nowrap text-sm">
											{user.created_at.toString().slice(0, 10)}
										</td>
										<td className="whitespace-nowrap px-3">
											<div className="flex items-center gap-3">
												<Link href={`/dashboard/customers/${user.id}/edit`}>
													<Button className="bg-transparent text-green-600 hover:text-green-50 hover:bg-green-600 px-2 border border-green-600 h-fit">
														<FaPencil className="w-5" />
													</Button>
												</Link>
												<DeleteModal label="Customer" id={user.id} />
											</div>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default CustomersList;
