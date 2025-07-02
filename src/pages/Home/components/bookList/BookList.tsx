import { useGetBooksQuery } from "@/redux/api/baseApi";
import BookTable from "@/shared/bookTable/BookTable";
import SectionTitle from "@/shared/sectionTitle/SectionTitle";


const BookList = () => {
    const { data, isLoading } = useGetBooksQuery(undefined);
    return (
        <div className="my-5">
            <SectionTitle title="Book List" />
            <BookTable tableData={data?.data?.slice(0, 5)} isLoading={isLoading} />
        </div>
    );
};

export default BookList;