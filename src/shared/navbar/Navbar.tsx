import { NavLink } from "react-router";

const commonClass = `hover:underline cursor-pointer`;
const Navbar = () => {
    return (
        <div className="bg-slate-500 h-14 w-full">
            <div className="max-w-5xl mx-auto flex flex-row justify-between items-center h-full text-white">
                <p className="italic font-bold">Boi Ghor</p>
                <div className="flex flex-row gap-5 font-semibold">
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
                    } to="/borrow-summury">Borrow Summury</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;