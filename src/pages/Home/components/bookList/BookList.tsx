import { useGetBooksQuery } from "@/redux/api/baseApi";
import BookTable from "@/shared/bookTable/BookTable";
import SectionTitle from "@/shared/sectionTitle/SectionTitle";
import { Link } from "react-router";


const BookList = () => {
    const page = 1;
    const limit = 5
    const { data, isLoading } = useGetBooksQuery({ page, limit }, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    });
    return (
        <div className="my-5">
            <SectionTitle title="Book List" />
            <BookTable tableData={data?.data?.slice(0, 5) || []} isLoading={isLoading} />
            <Link className="flex flex-row justify-center" to="/books">
                <p className="border-y-[2px] border-black w-24 text-center py-1 rounded-xl">
                    See All
                </p>
            </Link>
        </div>
    );
};

export default BookList;