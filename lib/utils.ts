import { compareSync, hashSync } from "bcryptjs";

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

export const hashPassword = (password: string): string => {
	return hashSync(password + process.env.PEPPER, 10);
};

export const isPasswordMatch = (userPassword: string, dbPassword: string) => {
	return compareSync(userPassword + process.env.PEPPER, dbPassword);
};
