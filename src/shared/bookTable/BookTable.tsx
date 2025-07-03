import { BookOpen, Pencil, Trash2 } from "lucide-react";
import Modal from "../modal/Modal";
import { useState } from "react";
import EditBookForm from "@/components/editBookForm/EditBookForm";
import type { Book } from "@/interfaces";
import Swal from 'sweetalert2';
import BorrowBookForm from "@/components/borrowBookForm/BorrowBookForm";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import Spinner from "../spinner/Spinner";
import { useNavigate } from "react-router";
interface BookTableProps {
    tableData: Book[];
    isLoading: boolean
}

const headers = ["S.No.", "Title", "Author", "Genre", "ISBN", "Copies", "Availability", "Actions",];
const BookTable: React.FC<BookTableProps> = ({ tableData, isLoading }) => {
    const [deleteBook] = useDeleteBookMutation();
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [borrowModalOpen, setBorrowModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleBook = (id: string) => {
        navigate(`/book/${id}`);
    }

    const handleEdit = (book: Book) => {
        setSelectedBook(book);
        setEditModalOpen(true);
    };
    const handleBorrow = (book: Book) => {
        setSelectedBook(book);
        setBorrowModalOpen(true);
    };
    const handleDelete = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteBook(id);
                console.log(res);
                if (res?.data?.success === true) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Book has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    };

    return (
        <div className="my-5 w-full overflow-x-auto">
            <table className="w-[800px] lg:w-full">
                <thead>
                    <tr className="bg-gray-100">
                        {headers.map((header) => (
                            <th key={header} className="px-2 py-4 text-left">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={headers.length} className="py-10 text-center">
                                <div className="flex justify-center">
                                    <Spinner className="w-6 h-6" />
                                </div>
                            </td>
                        </tr>

                    ) : (
                        tableData?.length > 0 ? (
                            tableData?.map((book: Book, index: number) => (
                                <tr onClick={() => handleBook(book?._id)} key={index} className="hover:bg-gray-200 duration-100 cursor-pointer">
                                    <td className="px-2 py-4 border-y">{index + 1}</td>
                                    <td className="px-2 py-4 border-y">{book.title?.length > 20 ? `${book.title?.slice(0, 20)}...` : book.title}</td>
                                    <td className="px-2 py-4 border-b">{book.author}</td>
                                    <td className="px-2 py-4 border-b">{book.genre}</td>
                                    <td className="px-2 py-4 border-b">{book.isbn?.length > 20 ? `${book.isbn?.slice(0, 20)}...` : book.isbn}</td>
                                    <td className="px-2 py-4 border-b">{book.copies}</td>
                                    <td className="px-2 py-4 border-b">{book.available ? "Yes" : "No"}</td>
                                    <td className="p-2 border-b">
                                        <div className="flex gap-3">
                                            <button onClick={() => handleEdit(book)} title="Edit">
                                                <Pencil className="text-blue-600 hover:text-blue-800 w-5 h-5 cursor-pointer" />
                                            </button>
                                            <button onClick={() => handleBorrow(book)} title="Borrow">
                                                <BookOpen className="text-green-600 hover:text-green-800 w-5 h-5 cursor-pointer" />
                                            </button>
                                            <button onClick={() => handleDelete(book?._id)} title="Delete">
                                                <Trash2 className="text-red-600 hover:text-red-800 w-5 h-5 cursor-pointer" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={headers.length} className="py-10 text-center">
                                    No books found
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>

            <>
                {
                    editModalOpen ?
                        <Modal
                            isOpen={editModalOpen}
                            onClose={() => setEditModalOpen(false)
                            }
                        >
                            <EditBookForm book={selectedBook as Book} setEditModalOpen={setEditModalOpen} />
                        </Modal>
                        :
                        borrowModalOpen &&
                        <Modal
                            isOpen={borrowModalOpen}
                            onClose={() => setBorrowModalOpen(false)
                            }
                        >
                            <BorrowBookForm selectedBook={selectedBook as Book} setBorrowModalOpen={setBorrowModalOpen} />
                        </Modal>
                }
            </>
        </div>
    );
};

export default BookTable;