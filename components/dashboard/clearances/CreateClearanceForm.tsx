"use client";
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
import { cn } from "@/lib/utils";
import { Port } from "@/types/port";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdAttachMoney, MdOutlineMoneyOff } from "react-icons/md";

export const CreateClearanceForm = ({ ports }: { ports: Port[] | null }) => {
	const [isLoading, setIsLoading] = useState(false);

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

	// const router = useRouter();
	const { toast } = useToast();

	// TODO: Create clearance
	function onSubmit(data: CreateClearanceInput) {
		console.log("onSubmit function called with data:", data);
		try {
			setIsLoading(true);

			toast({
				title: "You submitted the following values:",
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<code className="text-white">{JSON.stringify(data, null, 2)}</code>
					</pre>
				),
			});
		} catch (error) {
			console.error("ERROR IN FORM SUBMISSION", error);
			toast({
				title: "Error in form submission",
				description: (
					<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
						<p className="text-red-500">{(error as Error).message}</p>
					</pre>
				),
			});
		} finally {
			setIsLoading(false);
		}
	}

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
										Port
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
						<FileInputField
							name="vat_receipt"
							label="VAT Receipt"
							form={form}
						/>
					</div>

					<fieldset className="mb-3">
						<legend className="mb-3 block text-md font-bold text-green-900">
							Is VAT Paid?
						</legend>
						<section className="flex flex-col md:flex-row gap-10 items-center rounded-md border border-green-200 bg-white px-[14px] py-3">
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
										<FormLabel className="flex cursor-pointer items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 font-bold text-green-900">
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
										<FormLabel className="flex cursor-pointer items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 font-bold text-green-900">
											<span className="hidden md:inline">No</span>
											<MdOutlineMoneyOff className="h-5 w-5" />
										</FormLabel>
										<FormMessage />
									</FormItem>
								)}
							/>
						</section>
					</fieldset>
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
						aria-disabled={isLoading}
						onClick={() => console.log("Button clicked")}>
						{isLoading ? "Creating..." : "Create"}
					</Button>
				</section>
			</form>
		</Form>
	);
};
