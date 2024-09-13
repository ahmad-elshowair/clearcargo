import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const isOver18 = (dateOfBirth: string): boolean => {
	const today = new Date();
	const birthDate = new Date(dateOfBirth);
	const year = today.getFullYear() - birthDate.getFullYear();
	const month = today.getMonth() - birthDate.getMonth();
	return year > 18 || (year === 18 && month >= 0);
};
