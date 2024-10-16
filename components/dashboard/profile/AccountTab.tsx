"use client";

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

import { FC } from "react";
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
	// const router = useRouter();

	const formInfo = useForm<UpdateCustomerData>({
		resolver: zodResolver(UpdateCustomerSchema),
		defaultValues: {
			email: user?.email,
			first_name: user?.user_metadata.first_name,
			surname: user?.user_metadata.surname,
			date_of_birth: user?.user_metadata.date_of_birth,
			mobile_number: user?.user_metadata.mobile_number,
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

	const onSubmitInformation = async () => {};
	const onSubmitSettings = async () => {};
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
					<form action={onSubmitInformation}>
						<Card className="bg-green-100">
							<CardHeader className="mb-8">
								<CardTitle>Personal Information</CardTitle>
								<CardDescription>
									{`Make changes to your personal information here. Click save when you're done.`}
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
															className="bg-white border-none rounded-l-none"
															onChange={(e) => field.onChange(e.target.value)}
															value={field.value}
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
															className="bg-white border-none rounded-l-none"
															onChange={(e) => field.onChange(e.target.value)}
															value={field.value}
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
															type="date"
															className="bg-white border-none rounded-l-none"
															onChange={(e) =>
																field.onChange(new Date(e.target.value))
															}
															value={
																new Date(field.value)
																	.toISOString()
																	.split("T")[0]
															}
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
															className="bg-white border-none rounded-l-none"
															onChange={(e) => field.onChange(e.target.value)}
															value={field.value}
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
															type="email"
															className="bg-white border-none rounded-l-none"
															onChange={(e) => field.onChange(e.target.value)}
															value={field.value}
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
									Save changes
								</Button>
							</CardFooter>
						</Card>
					</form>
				</Form>
			</TabsContent>
			<TabsContent value="account-settings">
				<Form {...formSettings}>
					<form action={onSubmitSettings}>
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
