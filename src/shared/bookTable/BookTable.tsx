import { BookOpen, Pencil, Trash2 } from "lucide-react";
import Modal from "../modal/Modal";
import { useState } from "react";
import EditBookForm from "@/components/editBookForm/EditBookForm";
import type { Book } from "@/interfaces";
import Swal from 'sweetalert2';
import BorrowBookForm from "@/components/borrowBookForm/BorrowBookForm";

const tableData = [
    {
        title: "The Lost Cartographer",
        author: "Amelia Hawthorne",
        genre: "Adventure",
        isbn: "978-1-9843-5293-2",
        description: "A thrilling journey across forgotten continents guided by an ancient map.",
        copies: 10,
        available: true,
    },
    {
        title: "Quantum Whispers",
        author: "Dorian Vale",
        genre: "Science Fiction",
        isbn: "978-0-141-03764-3",
        description: "A mind-bending tale of parallel worlds and the scientist who can hear them speak.",
        copies: 5,
        available: true,
    },
    {
        title: "Beneath the Ivory Tree",
        author: "Lucinda Marlowe",
        genre: "Fantasy",
        isbn: "978-0-06-296367-3",
        description: "An orphan discovers a magical tree that holds the fate of her realm.",
        copies: 10,
        available: false,
    },
    {
        title: "The Algorithm of Hearts",
        author: "Noah Bennett",
        genre: "Romance",
        isbn: "978-1-250-30654-6",
        description: "An AI researcher and a poet find love through a shared digital diary.",
        copies: 5,
        available: true,
    },
    {
        title: "Echoes from the Asylum",
        author: "Greta Hensley",
        genre: "Horror",
        isbn: "978-1-5011-9459-8",
        description: "Journal entries from an abandoned asylum reveal unspeakable horrors.",
        copies: 3,
        available: true,
    },
];

const headers = [
    "Title",
    "Author",
    "Genre",
    "ISBN",
    "Copies",
    "Availability",
    "Actions",
];

const BookTable = () => {
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [borrowModalOpen, setBorrowModalOpen] = useState(false);
    const handleEdit = (book: Book) => {
        setSelectedBook(book);
        setEditModalOpen(true);
        console.log(selectedBook);
    };
    const handleBorrow = (book: Book) => {
        setSelectedBook(book);
        setBorrowModalOpen(true);
        console.log(selectedBook);
    };

    const handleDelete = (book: Book) => {
        console.log(book);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    };

    return (
        <div className="my-5 w-full overflow-x-auto">
            <table className="w-[800px] lg:w-full">
                <thead>
                    <tr className="bg-gray-100">
                        {headers.map((header) => (
                            <th key={header} className="px-2 py-4 border-b text-left">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((book, index) => (
                        <tr key={index} className="hover:bg-gray-200 duration-100 cursor-pointer">
                            <td className="px-2 py-4 border-b">{book.title}</td>
                            <td className="px-2 py-4 border-b">{book.author}</td>
                            <td className="px-2 py-4 border-b">{book.genre}</td>
                            <td className="px-2 py-4 border-b">{book.isbn}</td>
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
                                    <button onClick={() => handleDelete(book)} title="Delete">
                                        <Trash2 className="text-red-600 hover:text-red-800 w-5 h-5 cursor-pointer" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
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
                            <EditBookForm />
                        </Modal> :
                    borrowModalOpen &&
                        <Modal
                            isOpen={borrowModalOpen}
                            onClose={() => setBorrowModalOpen(false)
                            }
                        >
                            <BorrowBookForm />
                        </Modal> 
                }
            </>
        </div>
    );
};

export default BookTable;