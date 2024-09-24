import { FC } from "react";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "./ui/pagination";

type PaginationControlsProps = {
	currentPage: number;
	totalPages: number;
	createPageURL: (pageNumber: number) => string;
};

export const PaginationControls: FC<PaginationControlsProps> = ({
	currentPage = 1,
	totalPages = 1,
	createPageURL,
}) => {
	const MAX_VISIBLE_PAGES = 5;

	let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
	const endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

	if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
		startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
	}

	const pageNumbers = Array.from(
		{ length: endPage - startPage + 1 },
		(_, i) => startPage + i,
	);
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={createPageURL(Math.max(1, currentPage - 1))}
					/>
				</PaginationItem>
				{startPage > 1 && (
					<>
						<PaginationItem>
							<PaginationLink href={createPageURL(1)}>1</PaginationLink>
						</PaginationItem>
						{startPage > 2 && <PaginationEllipsis />}
					</>
				)}
				{pageNumbers.map((number, index) => (
					<PaginationItem key={index}>
						<PaginationLink
							href={createPageURL(number)}
							isActive={currentPage === number}>
							{number}
						</PaginationLink>
					</PaginationItem>
				))}

				{endPage < totalPages && (
					<>
						{endPage < totalPages - 1 && <PaginationEllipsis />}
						<PaginationItem>
							<PaginationLink href={createPageURL(totalPages)}>
								{totalPages}
							</PaginationLink>
						</PaginationItem>
					</>
				)}
				<PaginationItem>
					<PaginationNext
						href={createPageURL(Math.min(totalPages, currentPage + 1))}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
