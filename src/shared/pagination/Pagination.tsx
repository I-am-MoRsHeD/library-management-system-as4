import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    page: number;
    total: number;
    limit: number;
    setPage: (value: number) => void;
}

const Pagination = ({ page, total, limit, setPage }: PaginationProps) => {
    const totalPages = total && limit ? Math.ceil(total / limit) : 0;

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handlePageClick = (pageNum: number) => {
        if (pageNum !== page) {
            setPage(pageNum);
        }
    };

    return (
        <div className="flex justify-center items-center gap-2 py-4">
            <button
                onClick={handlePrev}
                disabled={page === 1}
                className="text-gray-600 disabled:opacity-50"
            >
                <ChevronLeft size={20} />
            </button>

            {[...Array(totalPages)]?.map((_, idx) => {
                const pageNum = idx + 1;
                return (
                    <button
                        key={pageNum}
                        onClick={() => handlePageClick(pageNum)}
                        className={`w-8 h-8 rounded-full text-sm font-medium 
              ${pageNum === page
                                ? "bg-gray-700 text-white"
                                : "text-gray-700 hover:bg-gray-200"}`}
                    >
                        {pageNum}
                    </button>
                );
            })}

            <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="text-gray-600 disabled:opacity-50"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default Pagination;
