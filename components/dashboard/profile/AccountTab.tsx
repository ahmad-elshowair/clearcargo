"use client";

import { updateCustomerInfo } from "@/actions/customer";
import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	ChangePasswordData,
	ChangePasswordSchema,
	UpdateCustomerData,
	UpdateCustomerSchema,
} from "@/lib/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { FaBirthdayCake } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { PiTextboxBold } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";

interface AccountTabProps {
	user: User | null;
}

const AccountTab: FC<AccountTabProps> = ({ user }) => {
	const router = useRouter();
	const { toast } = useToast();
	const [isPending, setIsPending] = useState(false);

	const formInfo = useForm<UpdateCustomerData>({
		resolver: zodResolver(UpdateCustomerSchema),
		defaultValues: {
			email: user?.email || "",
			first_name: user?.user_metadata.first_name || "",
			surname: user?.user_metadata.surname || "",
			date_of_birth: user?.user_metadata.date_of_birth || "",
			mobile_number: user?.user_metadata.mobile_number || "",
		},
	});

	const formSettings = useForm<ChangePasswordData>({
		resolver: zodResolver(ChangePasswordSchema),
		defaultValues: {
			old_password: "",
			new_password: "",
			confirm_new_password: "",
		},
	});

	const onSubmitInformation = async (data: UpdateCustomerData) => {
		setIsPending(true);
		try {
			const formData = new FormData();
			// SET THE FIELDS OF THE FORM DATA.
			Object.entries(data).forEach(([key, value]) => {
				formData.append(key, value?.toString() || "");
			});

			// UPDATE THE USER IN SUPABASE.
			const result = await updateCustomerInfo(formData);

			// CHECK IF THE UPDATE WAS NOT SUCCESSFUL.
			if (result.status === "error") {
				toast({
					title: "UPDATE PROFILE INFORMATION ERROR",
					description: (
						<div className="bg-red-100 p-4 rounded-md w-[360px] shadow shadow-red-500">
							<p className="text-md font-bold text-red-500">{result.message}</p>
						</div>
					),
					duration: 5000,
					className:
						"border-none bg-red-500/80 font-extrabold text-lg text-white",
				});
			} else {
				toast({
					title: "UPDATE PROFILE INFORMATION SUCCESS",
					description: (
						<div className="bg-green-100 p-4 rounded-md w-[350px] shadow shadow-green-500">
							<p className="text-md font-bold text-green-500">
								{result.message}
							</p>
						</div>
					),
					duration: 5000,
					className:
						"border-none bg-green-500/80 font-extrabold text-lg text-white",
				});

				router.refresh();
			}
		} catch (error) {
			console.error("Error updating customer information: ", error);

			toast({
				title: "UPDATE CUSTOMER INFORMATION ERROR",
				description: (
					<div className="bg-red-100 p-4 rounded-md w-[360px] shadow shadow-red-500">
						<p className="text-md font-bold text-red-500">
							{(error as Error).message}
						</p>
					</div>
				),
				duration: 5000,
				className:
					"border-none bg-red-500/80 font-extrabold text-lg text-white",
			});
		} finally {
			setIsPending(false);
		}
	};

	const onSubmitSettings = async (data: ChangePasswordData) => {
		console.log("onSubmitSettings called with data:", data); // Debug log
	};
	return (
		<Tabs defaultValue="personal-info" className="w-ful">
			<TabsList className="flex w-full bg-green-100">
				<TabsTrigger
					value="personal-info"
					className="w-full text-green-800 font-bold data-[state=active]:bg-green-500 data-[state=active]:text-green-100">
					Personal Info
				</TabsTrigger>
				<TabsTrigger
					value="account-settings"
					className=" w-full text-green-800 font-bold data-[state=active]:bg-green-500 data-[state=active]:text-green-100">
					Account Settings
				</TabsTrigger>
			</TabsList>
			<TabsContent value="personal-info">
				<Form {...formInfo}>
					<form onSubmit={formInfo.handleSubmit(onSubmitInformation)}>
						<Card className="bg-green-100">
							<CardHeader className="mb-8">
								<CardTitle>Personal Information</CardTitle>
								<CardDescription>
									Make changes to your personal information here. Click save
									when you are done.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
									<FormField
										control={formInfo.control}
										name="first_name"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel className="text-green-800 md:font-bold">
													First Name
												</FormLabel>
												<FormControl>
													<div className="flex items-center border border-gray-200 rounded-lg">
														<span className="p-2 bg-gray-200 rounded-l-lg">
															<PiTextboxBold className=" h-[20px] w-[18px] text-green-700" />
														</span>
														<Input
															{...field}
															className="bg-white border-none rounded-l-none"
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={formInfo.control}
										name="surname"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel className="text-green-800 md:font-bold">
													Surname
												</FormLabel>
												<FormControl>
													<div className="flex items-center border border-gray-200 rounded-lg">
														<span className="p-2 bg-gray-200 rounded-l-lg">
															<PiTextboxBold className=" h-[20px] w-[18px] text-green-700" />
														</span>
														<Input
															{...field}
															className="bg-white border-none rounded-l-none"
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
									<FormField
										control={formInfo.control}
										name="date_of_birth"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel className="text-green-800 md:font-bold">
													Date of Birth
												</FormLabel>
												<FormControl>
													<div className="flex items-center border border-gray-200 rounded-lg">
														<span className="p-2 bg-gray-200 rounded-l-lg">
															<FaBirthdayCake className=" h-[20px] w-[18px] text-green-700" />
														</span>
														<Input
															{...field}
															type="date"
															className="bg-white border-none rounded-l-none"
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={formInfo.control}
										name="mobile_number"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel className="text-green-800 md:font-bold">
													Mobile Number
												</FormLabel>
												<FormControl>
													<div className="flex items-center border border-gray-200 rounded-lg">
														<span className="p-2 bg-gray-200 rounded-l-lg">
															<FaSquarePhone className=" h-[20px] w-[18px] text-green-700" />
														</span>
														<Input
															{...field}
															className="bg-white border-none rounded-l-none"
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
									<FormField
										control={formInfo.control}
										name="email"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel className="text-green-800 md:font-bold">
													Email
												</FormLabel>
												<FormControl>
													<div className="flex items-center border border-gray-200 rounded-lg">
														<span className="p-2 bg-gray-200 rounded-l-lg">
															<MdAlternateEmail className=" h-[20px] w-[18px] text-green-700" />
														</span>
														<Input
															{...field}
															type="email"
															className="bg-white border-none rounded-l-none"
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</CardContent>
							<CardFooter className="justify-end">
								<Button
									className="bg-green-400 hover:bg-green-500 hover:font-bold"
									type="submit"
									disabled={isPending}>
									{isPending ? "Saving..." : "Save changes"}
								</Button>
							</CardFooter>
						</Card>
					</form>
				</Form>
			</TabsContent>
			<TabsContent value="account-settings">
				<Form {...formSettings}>
					<form onSubmit={formSettings.handleSubmit(onSubmitSettings)}>
						<Card className="bg-green-100">
							<CardHeader className="mb-8">
								<CardTitle>Password</CardTitle>
								<CardDescription>
									{`Change your password here. After saving, you'll be logged out.`}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="mb-3">
									<FormField
										control={formSettings.control}
										name="old_password"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel className="text-green-800 md:font-bold">
													Old Password
												</FormLabel>
												<FormControl>
													<div className="flex items-center border border-gray-200 rounded-lg">
														<span className="p-2 bg-gray-200 rounded-l-lg">
															<RiLockPasswordFill className=" h-[20px] w-[18px] text-green-700" />
														</span>
														<Input
															{...field}
															type="password"
															placeholder="********"
															className="bg-white border-none rounded-l-none"
															onChange={(e) => field.onChange(e.target.value)}
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="mb-3">
									<FormField
										control={formSettings.control}
										name="new_password"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel className="text-green-800 md:font-bold">
													New Password
												</FormLabel>
												<FormControl>
													<div className="flex items-center border border-gray-200 rounded-lg">
														<span className="p-2 bg-gray-200 rounded-l-lg">
															<RiLockPasswordFill className=" h-[20px] w-[18px] text-green-700" />
														</span>
														<Input
															{...field}
															type="password"
															placeholder="********"
															className="bg-white border-none rounded-l-none"
															onChange={(e) => field.onChange(e.target.value)}
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="mb-3">
									<FormField
										control={formSettings.control}
										name="confirm_new_password"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel className="text-green-800 md:font-bold">
													Confirm New Password
												</FormLabel>
												<FormControl>
													<div className="flex items-center border border-gray-200 rounded-lg">
														<span className="p-2 bg-gray-200 rounded-l-lg">
															<RiLockPasswordFill className=" h-[20px] w-[18px] text-green-700" />
														</span>
														<Input
															{...field}
															type="password"
															placeholder="********"
															className="bg-white border-none rounded-l-none"
															onChange={(e) => field.onChange(e.target.value)}
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</CardContent>
							<CardFooter className="justify-end">
								<Button className="bg-green-400 hover:bg-green-500 hover:font-bold">
									Change password
								</Button>
							</CardFooter>
						</Card>
					</form>
				</Form>
			</TabsContent>
		</Tabs>
	);
};

export default AccountTab;
