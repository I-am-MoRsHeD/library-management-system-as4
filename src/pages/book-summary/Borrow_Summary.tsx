import type { BorrowedBook } from "@/interfaces";
import { useBorrowedBooksQuery } from "@/redux/api/baseApi";
import SectionTitle from "@/shared/sectionTitle/SectionTitle";
import Spinner from "@/shared/spinner/Spinner";

const commonClass = `px-2 py-4 text-left truncate whitespace-normal break-words border`
const Borrow_Summary = () => {
    const { data: borrowedBooks, isLoading } = useBorrowedBooksQuery(undefined);

    return (
        <div className="my-5 w-full overflow-x-auto">
            <SectionTitle title="Borrow Summary" width="w-36" />
            <table className="w-[800px] lg:w-full table-fixed my-3">
                <thead>
                    <tr className="bg-gray-100">
                        <th className={`w-[100px] ${commonClass}`}>S.No.</th>
                        <th className={commonClass}>Book Title</th>
                        <th className={commonClass}>ISBN</th>
                        <th className={commonClass}>Total Quantity Borrowed</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={4} className="py-10 text-center">
                                <div className="flex justify-center">
                                    <Spinner className="w-6 h-6" />
                                </div>
                            </td>
                        </tr>

                    ) : (
                        borrowedBooks?.data?.length > 0 ? (
                            borrowedBooks?.data?.map((book : BorrowedBook, index: number) => (
                                <tr key={index} className="hover:bg-gray-200 duration-100 cursor-pointer">
                                    <td className="w-[100px] px-2 py-4 border-y">{index + 1}</td>
                                    <td className="px-2 py-4 border-y">{book?.book?.title?.length > 40 ? `${book?.book?.title?.slice(0, 40)}...` : book?.book?.title}</td>
                                    <td className="px-2 py-4 border-b">{book?.book?.isbn}</td>
                                    <td className="px-2 py-4 border-b">{book?.totalQuantity}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="py-10 text-center">
                                    You haven't borrowed any books yet....
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Borrow_Summary;