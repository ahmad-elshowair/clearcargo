"use client";
import { createClearance } from "@/actions/clearance";
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
import {
	CreateClearanceInput,
	CreateClearanceSchema,
} from "@/lib/schemas/clearance";
import { uploadFile } from "@/lib/supabase/uploadFile";
import { cn } from "@/lib/utils";
import { Port } from "@/types/port";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAttachMoney, MdOutlineMoneyOff } from "react-icons/md";

export const CreateClearanceForm = ({ ports }: { ports: Port[] | null }) => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();
	const { toast } = useToast();

	const form = useForm<CreateClearanceInput>({
		resolver: zodResolver(CreateClearanceSchema),
		defaultValues: {
			port_id: "",
			is_vat_paid: false,
			vat_receipt: null,
			invoice: undefined,
			loading_bill: undefined,
			arrival_date: new Date(),
		},
	});

	// WATCHING FOR VAT PAYMENT
	const isVatPaid = form.watch("is_vat_paid");

	const onSubmit = async (data: CreateClearanceInput) => {
		setIsSubmitting(true);
		try {
			// UPLOAD THE CLEARANCE FILES TO SUPABASE STORAGE
			const fileUploads = await Promise.all([
				data.invoice instanceof File
					? uploadFile(data.invoice, "invoices")
					: { status: "success", url: data.invoice, message: null },
				data.vat_receipt instanceof File
					? uploadFile(data.vat_receipt, "vat_receipts")
					: { status: "success", url: data.vat_receipt, message: null },
				data.loading_bill instanceof File
					? uploadFile(data.loading_bill, "loading_bills")
					: { status: "success", url: data.loading_bill, message: null },
			]);

			// GET THE UPLOADED FILE URLS
			const [invoiceResult, vatReceiptResult, loadingBillResult] =
				fileUploads.map((file) => file.url);

			// GET THE UPLOADED FILE ERRORS IF ANY	
			const uploadErrors = fileUploads.filter(
				(file) => file.status === "error",
			);

			// IF THERE ARE ERRORS IN UPLOADING FILES, SHOW THEM IN A TOAST MESSAGE AND RETURN
			if (uploadErrors.length > 0) {
				const errorMessages = uploadErrors
					.map((error) => error.message)
					.filter((message) => message !== null)
					.join(" - ");

				toast({
					title: "UPLOADING FILES",
					description: errorMessages,
					variant: "destructive",
				});

				console.error("UPLOADING FILES ERROR", errorMessages);
				return;
			}

			// CREATE THE CLEARANCE
			const result = await createClearance({
				...data,
				arrival_date: data.arrival_date.toISOString(),
				invoice: invoiceResult,
				vat_receipt: vatReceiptResult,
				loading_bill: loadingBillResult,
			});

			// IF THERE IS AN ERROR IN CREATING THE CLEARANCE, SHOW THE MESSAGE IN A TOAST MESSAGE
			if (result.status === "error") {
				console.error("ERROR IN CLEARANCE CREATION", result.message);
				toast({
					title: "CREATION OF CLEARANCE",
					description: result.message,
					variant: "destructive",
				});

			} else {
				// IF THERE IS NO ERROR, SHOW A SUCCESS MESSAGE, REDIRECT TO THE CLEARANCES PAGE
				toast({
					title: "CREATION OF CLEARANCE",
					description: result.message,
				});
				router.push("/dashboard/clearances");
			}
		} catch (error) {
			console.error("ERROR IN FORM SUBMISSION", error);
			toast({
				title: "Error in form submission",
				description: (error as Error).message,
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<section className="bg-green-100 p-4 rounded-lg md:p-6">
					{/* SELECT PORT  */}
					<div className="flex justify-between items-center mb-10 gap-4">
						<FormField
							control={form.control}
							name="port_id"
							render={({ field }) => (
								<FormItem className="flex flex-col w-1/2">
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
								<FormItem className="w-1/2">
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

					<div className="mb-10 flex gap-4">
						<FileInputField name="invoice" label="Invoice" form={form} />
						<FileInputField
							name="loading_bill"
							label="Loading Bill"
							form={form}
						/>
					</div>

					<section className="flex w-full justify-between items-center mb-10 gap-3">
						<fieldset className="mb-3 w-1/2">
							<legend className="mb-3 block text-md font-bold text-green-900">
								Is VAT Paid?
							</legend>
							<section className="flex flex-col md:flex-row gap-10 items-center ">
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
							<FileInputField
								name="vat_receipt"
								label="VAT Receipt"
								form={form}
							/>
						)}
					</section>
				</section>
				<section className="mt-4 flex justify-end gap-4">
					<Link
						href={"/dashboard/clearances"}
						className="px-8 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-200 transition-colors duration-200 py-4 rounded-md">
						Cancel
					</Link>
					<Button
						type="submit"
						className="h-fit rounded-md bg-green-500 py-4 px-8 text-sm font-medium transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-50 active:bg-green-600 duration-200 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 text-green-50"
						disabled={isSubmitting}
						aria-disabled={isSubmitting}>
						{isSubmitting ? "Creating..." : "Create"}
					</Button>
				</section>
			</form>
		</Form>
	);
};
