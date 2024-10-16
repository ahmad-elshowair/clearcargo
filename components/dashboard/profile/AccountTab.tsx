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
	UpdateCustomerData,
	UpdateCustomerSchema,
} from "@/lib/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";

import { FC } from "react";
import { useForm } from "react-hook-form";
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
													<Input
														className="bg-white"
														onChange={(e) => field.onChange(e.target.value)}
														value={field.value}
													/>
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
													<Input
														className="bg-white"
														onChange={(e) => field.onChange(e.target.value)}
														value={field.value}
													/>
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
													<Input
														type="date"
														className="bg-white"
														onChange={(e) =>
															field.onChange(new Date(e.target.value))
														}
														value={
															new Date(field.value).toISOString().split("T")[0]
														}
													/>
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
													<Input
														className="bg-white"
														onChange={(e) => field.onChange(e.target.value)}
														value={field.value}
													/>
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
													<Input
														type="email"
														className="bg-white"
														onChange={(e) => field.onChange(e.target.value)}
														value={field.value}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</CardContent>
							<CardFooter className="justify-end">
								<Button className="bg-green-500 hover:bg-green-700">
									Save changes
								</Button>
							</CardFooter>
						</Card>
					</form>
				</Form>
			</TabsContent>
			<TabsContent value="account-settings">
				<form action={onSubmitSettings}>
					<Card className="bg-green-100">
						<CardHeader>
							<CardTitle>Password</CardTitle>
							<CardDescription>
								{`Change your password here. After saving, you'll be logged out.`}
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div>
								<label
									className="block mb-2 text-sm font-bold text-emerald-900"
									htmlFor="old_password">
									Old Password
								</label>
								<div className="relative">
									<input
										className="peer block w-full border border-emerald-200 pl-10 py-2 outline-2 text-sm placeholder:text-emerald-700 rounded-md"
										type="password"
										id="old_password"
										name="old_password"
										aria-describedby="old_password-error"
										placeholder="***********"
									/>
									<RiLockPasswordFill className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-emerald-700" />
								</div>
							</div>

							<div className="mb-2">
								<label
									className="block mb-2 text-sm font-bold text-emerald-900"
									htmlFor="new_password">
									New Password
								</label>
								<div className="relative">
									<input
										className="peer block w-full border border-emerald-200 pl-10 py-2 outline-2 text-sm placeholder:text-emerald-700 rounded-md"
										type="password"
										id="new_password"
										name="new_password"
										aria-describedby="new_password-error"
										placeholder="********"
									/>
									<RiLockPasswordFill className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-emerald-700" />
								</div>
							</div>
						</CardContent>
						<CardFooter className="justify-end">
							<Button className="bg-green-400 hover:bg-green-700">
								Change password
							</Button>
						</CardFooter>
					</Card>
				</form>
			</TabsContent>
		</Tabs>
	);
};

export default AccountTab;
