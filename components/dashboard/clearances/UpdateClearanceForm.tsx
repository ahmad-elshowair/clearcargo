"use client";
import { updateClearance } from "@/actions/clearance";
import { FileInputField } from "@/components/FileInputField";
import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ClearanceSchema, updateClearanceInput } from "@/lib/schemas/clearance";
import { cn } from "@/lib/utils";
import { TClearance } from "@/types/clearance";
import { Port } from "@/types/port";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { MdAttachMoney, MdOutlineMoneyOff } from "react-icons/md";

interface UpdateClearanceFormProps {
	ports: Port[] | null;
	clearance?: TClearance;
}
export const UpdateClearanceForm: FC<UpdateClearanceFormProps> = ({
	ports,
	clearance,
}) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	console.log("the current clearance is", clearance);

	const form = useForm<updateClearanceInput>({
		resolver: zodResolver(ClearanceSchema),
		defaultValues: {
			port_id: clearance?.port_id,
			is_vat_paid: clearance?.is_vat_paid,
			vat_receipt: clearance?.vat_receipt,
			invoice: clearance?.invoice,
			loading_bill: clearance?.loading_bill,
			arrival_date: new Date(clearance?.arrival_date ?? new Date()),
		},
	});

	// WATCHING FOR VAT PAYMENT
	const isVatPaid = form.watch("is_vat_paid");

	const onSubmit = async (data: updateClearanceInput) => {
		setIsSubmitting(true);
		try {
			// CREATE A formData OBJECT TO SEND THE FILES
			const formData = new FormData();

			// ENSURE clearance_id IS AVAILABLE AND APPEND IT TO THE formData OBJECT
			if (!clearance?.id) {
				toast({
					title: "Update a Clearance",
					description: (
						<div className="p-2 bg-red-200 text-red-800 rounded-md w-[350px]">
							<p>Clearance ID is missing. Unable to update.</p>
						</div>
					),

					duration: 5000,
				});
				setIsSubmitting(false);
				return;
			}

			formData.append("id", clearance.id);

			// APPEND ALL FORM DATA TO THE formData OBJECT
			Object.entries(data).forEach(([key, value]) => {
				if (value instanceof File) {
					formData.append(key, value);
				} else if (value !== null && value !== undefined) {
					formData.append(key, String(value));
				}
			});

			// CREATE THE CLEARANCE
			const result = await updateClearance(formData);

			// IF THERE IS AN ERROR IN UPDATING THE CLEARANCE, SHOW THE MESSAGE IN A TOAST MESSAGE
			if (result.status === "error") {
				console.error("ERROR IN CLEARANCE UPDATE", result.message);
				toast({
					title: "Update of Clearance",
					description: (
						<div className="p-2 bg-red-100 text-red-800 rounded-md w-[350px]">
							<p>{result.message}</p>
						</div>
					),
					duration: 5000,
				});
			} else {
				// IF THERE IS NO ERROR, SHOW A SUCCESS MESSAGE, REDIRECT TO THE CLEARANCES PAGE
				toast({
					title: "Update a Clearance",
					description: (
						<div className="p-2 bg-green-100 text-green-800 rounded-md w-[350px]">
							<p>{result.message}</p>
						</div>
					),
					duration: 5000,
				});
				router.push("/dashboard/all-clearances");
			}
		} catch (error) {
			console.error("ERROR IN FORM UPDATE", error);
			toast({
				title: "Error in form update",
				description: (
					<div className="p-2 bg-red-100 text-red-800 rounded-md w-[350px]">
						<p>{(error as Error).message}</p>
					</div>
				),
				duration: 5000,
			});
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="pb-10 md:p-0">
				<section className="bg-green-100 p-4 rounded-lg md:p-6">
					{/* SELECT PORT  */}
					<div className="flex md:flex-row flex-col justify-between items-center mb-10 gap-4">
						<FormField
							control={form.control}
							name="port_id"
							render={({ field }) => (
								<FormItem className="flex flex-col md:w-1/2 w-full">
									<FormLabel className="text-md font-bold text-green-900">
										Select Port
									</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl className="bg-white">
												<Button
													variant="outline"
													role="combobox"
													className={cn(
														"w-full justify-between",
														!field.value && "text-muted-foreground",
													)}>
													{field.value
														? ports &&
														  ports.find((port) => port.id === field.value)
																?.port_name
														: "Select Port"}
													<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-full p-0">
											<Command>
												<CommandInput
													placeholder="Search ports..."
													className="h-9"
												/>
												<CommandList>
													<CommandEmpty>No Port found.</CommandEmpty>
													<CommandGroup>
														{ports &&
															ports.map((port) => (
																<CommandItem
																	value={port.port_name}
																	key={port.id}
																	onSelect={() => {
																		form.setValue("port_id", port.id);
																	}}>
																	{port.port_name}
																	<CheckIcon
																		className={cn(
																			"ml-auto h-4 w-4",
																			port.id === field.value
																				? "opacity-100"
																				: "opacity-0",
																		)}
																	/>
																</CommandItem>
															))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="arrival_date"
							render={({ field }) => (
								<FormItem className="w-full md:w-1/2">
									<FormLabel className="text-md font-bold text-green-900">
										Arrival Date
									</FormLabel>
									<FormControl>
										<Input
											type="date"
											className="bg-white"
											onChange={(e) => field.onChange(new Date(e.target.value))}
											value={
												field.value instanceof Date
													? field.value.toISOString().split("T")[0]
													: ""
											}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<div className="mb-10 flex md:flex-row flex-col gap-4">
						<FileInputField name="invoice" label="Invoice" form={form} />

						<FileInputField
							name="loading_bill"
							label="Loading Bill"
							form={form}
						/>
					</div>

					<section className="flex flex-col md:flex-row w-full items-center gap-3">
						<fieldset className="mb-3 md:w-1/2">
							<legend className="mb-3 block text-md font-bold text-green-900">
								Is VAT Paid?
							</legend>
							<section className="flex flex-row gap-10 items-center ">
								<FormField
									control={form.control}
									name="is_vat_paid"
									render={({ field }) => (
										<FormItem className="flex items-center gap-4 space-y-0">
											<FormControl>
												<Input
													type="radio"
													className="w-6 h-6"
													checked={field.value === true}
													onChange={() => field.onChange(true)}
												/>
											</FormControl>
											<FormLabel className="flex cursor-pointer items-center gap-1.5 rounded-full bg-green-300 px-3 py-1.5 font-bold text-green-900">
												<span className="text-md hidden md:inline-block">
													Yes
												</span>
												<MdAttachMoney className="h-5 w-5" />
											</FormLabel>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="is_vat_paid"
									render={({ field }) => (
										<FormItem className="flex items-center gap-4 space-y-0">
											<FormControl>
												<Input
													type="radio"
													className="w-6 h-6"
													checked={field.value === false}
													onChange={() => field.onChange(false)}
												/>
											</FormControl>
											<FormLabel className="flex cursor-pointer items-center gap-1.5 rounded-full bg-green-300 px-3 py-1.5 font-bold text-green-900">
												<span className="hidden md:inline">No</span>
												<MdOutlineMoneyOff className="h-5 w-5" />
											</FormLabel>
											<FormMessage />
										</FormItem>
									)}
								/>
							</section>
						</fieldset>
						{isVatPaid && (
							<div className="w-full md:w-1/2">
								<FileInputField
									name="vat_receipt"
									label="VAT Receipt"
									form={form}
								/>
							</div>
						)}
					</section>
				</section>
				<section className="mt-4 flex justify-center md:justify-end gap-4">
					<Link
						href={"/dashboard/all-clearances"}
						className="px-8 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-200 transition-colors duration-200 py-4 rounded-md">
						Cancel
					</Link>
					<Button
						type="submit"
						className="h-fit rounded-md bg-green-500 py-4 px-8 text-sm font-medium transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-50 active:bg-green-600 duration-200 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 text-green-50"
						disabled={isSubmitting}
						aria-disabled={isSubmitting}>
						{isSubmitting ? "Saving..." : "Save"}
					</Button>
				</section>
			</form>
		</Form>
	);
};
