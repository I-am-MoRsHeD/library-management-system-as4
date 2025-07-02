
import Layout from "@/layout/Layout";
import AllBooks from "@/pages/allBooks/AllBooks";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
    {
        path : '/',
       Component : Layout,
       children : [
        {
            path : '/',
            Component : Home
        },
        {
            path : '/books',
            Component : AllBooks
        }
       ]
    }
]);

export default router;