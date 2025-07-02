import SectionTitle from "@/shared/sectionTitle/SectionTitle";
import BookTable from "@/shared/bookTable/BookTable";
import { useGetBooksQuery } from "@/redux/api/baseApi";


const AllBooks = () => {
    const { data, isLoading } = useGetBooksQuery(undefined);
    return (
        <div className="my-5">
            <SectionTitle title="All Books" />
            <BookTable tableData={data?.data} isLoading={isLoading} />
        </div>
    );
};

export default AllBooks;