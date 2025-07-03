import { Link } from "react-router";



const Footer = () => {
    return (
        <div className="bg-slate-500 h-52 w-full">
            <div className="max-w-5xl mx-auto pb-2 pt-5 h-full">
                <div className="flex flex-row justify-between items-start text-white px-3 lg:px-0">
                    <div className="space-y-2">
                        <h2 className="italic font-bold">Boi Ghor</h2>
                        <p className="w-[60%] lg:w-1/2 text-xs">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis exercitationem laudantium nostrum itaque perferendis eligendi repellat reprehenderit corrupti rerum et!</p>
                    </div>
                    <div className="">
                        <p className="underline italic">Features</p>
                        <div className="space-y-1 lg:space-y-3 flex flex-col text-xs lg:text-base">
                            <Link to="/books">All Books</Link>
                            <Link to="/create-book">Add Book</Link>
                            <Link to="/borrow-summary">Borrow Summary</Link>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center text-white text-sm font-semibold">
                    <p>All rights reserved. Copyright &copy; 2025</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;