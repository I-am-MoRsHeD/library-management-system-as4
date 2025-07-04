import Layout from "@/layout/Layout";
import AddBookForm from "@/pages/addBook/AddBookForm";
import AllBooks from "@/pages/allBooks/AllBooks";
import Borrow_Summary from "@/pages/book-summary/Borrow_Summary";
import ErrorPage from "@/pages/errorPage/ErrorPage";
import Home from "@/pages/Home/Home";
import SingleBook from "@/pages/singleBook/SingleBook";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
    {
        path : '/',
       Component : Layout,
       errorElement : <ErrorPage />,
       children : [
        {
            path : '/',
            Component : Home
        },
        {
            path : '/books',
            Component : AllBooks
        },
        {
            path : '/book/:id',
            Component : SingleBook
        },
        {
            path : '/create-book',
            Component : AddBookForm
        },
        {
            path : '/borrow-summary',
            Component : Borrow_Summary
        }
       ]
    }
]);

export default router;