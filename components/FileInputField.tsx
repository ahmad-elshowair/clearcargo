import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

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
	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem className="w-1/3">
					<FormLabel className="text-md font-bold text-green-900">
						{label}
					</FormLabel>
					<FormControl>
						<Input
							type="file"
							className="bg-white"
							accept={ACCEPTED_FILE_TYPES.join(",")}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const file = e.target.files?.[0] || null;
								field.onChange(file);
							}}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
