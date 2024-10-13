import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { LuScreenShare } from "react-icons/lu";

const ACCEPTED_FILE_TYPES = [
	"image/jpeg",
	"image/png",
	"image/jpg",
	"application/pdf",
];

interface FileInputFieldProps<T extends FieldValues> {
	name: FieldPath<T>;
	label: string;
	form: UseFormReturn<T>;
}

export function FileInputField<T extends FieldValues>({
	name,
	label,
	form,
}: FileInputFieldProps<T>) {
	const currentFile = form.watch(name);
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className="w-full">
					<FormLabel className="text-md font-bold text-green-900">
						{label}
					</FormLabel>
					<FormControl>
						<div className="relative flex items-center gap-1">
							{currentFile && typeof currentFile === "string" && (
								<Link
									href={currentFile}
									target="_blank"
									rel="noopener noreferrer"
									className="text-green-500 hover:text-green-700 rounded-md bg-white py-1 px-2">
									<LuScreenShare className="pointer-events-none w-6 h-6" />
								</Link>
							)}
							<Input
								type="file"
								className="bg-white"
								accept={ACCEPTED_FILE_TYPES.join(",")}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									const file = e.target.files?.[0] || null;
									field.onChange(file);
								}}
							/>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
