import { Menu } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

const commonClass = `hover:underline cursor-pointer`;
const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    return (
        <div className="bg-slate-500 h-14 w-full">
            <div className="max-w-5xl mx-auto flex flex-row justify-between items-center h-full text-white px-3 lg:px-0">
                <p className="italic font-bold">Boi Ghor</p>
                <div className="flex-row gap-5 font-semibold hidden md:flex">
                    <NavLink className={({ isActive }) =>
                        `${commonClass} ${isActive ? "underline font-bold" : ""}`
                    } to="/">Home</NavLink>
                    <NavLink className={({ isActive }) =>
                        `${commonClass} ${isActive ? "underline font-bold" : ""}`
                    } to="/books">All Books</NavLink>
                    <NavLink className={({ isActive }) =>
                        `${commonClass} ${isActive ? "underline font-bold" : ""}`
                    } to="/create-book">Add Book</NavLink>
                    <NavLink className={({ isActive }) =>
                        `${commonClass} ${isActive ? "underline font-bold" : ""}`
                    } to="/borrow-summary">Borrow Summary</NavLink>
                </div>
                <div className="relative md:hidden">
                    <Menu onClick={() => setIsNavOpen(!isNavOpen)} />
                    <div>
                        {isNavOpen && (
                            <div className="absolute right-0 top-12 bg-slate-500 w-52 flex flex-col text-right gap-2 p-2 rounded-md duration-300">
                                <NavLink
                                    onClick={() => setIsNavOpen(!isNavOpen)}
                                    className={({ isActive }) =>
                                        `${commonClass} ${isActive ? "underline font-bold" : ""}`
                                    } to="/">Home</NavLink>
                                <NavLink
                                    onClick={() => setIsNavOpen(!isNavOpen)}
                                    className={({ isActive }) =>
                                        `${commonClass} ${isActive ? "underline font-bold" : ""}`
                                    } to="/books">All Books</NavLink>
                                <NavLink
                                    onClick={() => setIsNavOpen(!isNavOpen)}
                                    className={({ isActive }) =>
                                        `${commonClass} ${isActive ? "underline font-bold" : ""}`
                                    } to="/create-book">Add Book</NavLink>
                                <NavLink
                                    onClick={() => setIsNavOpen(!isNavOpen)}
                                    className={({ isActive }) =>
                                        `${commonClass} ${isActive ? "underline font-bold" : ""}`
                                    } to="/borrow-summary">Borrow Summary</NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;