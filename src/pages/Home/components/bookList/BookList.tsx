import BookTable from "@/shared/bookTable/BookTable";


const BookList = () => {

    return (
        <div className="my-5">
            <h3 className="border-b-[2px] border-black w-20 text-center rounded-b-xl">Book List</h3>
            <BookTable />
        </div>
    );
};

export default BookList;