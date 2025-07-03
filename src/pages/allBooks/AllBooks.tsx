import SectionTitle from "@/shared/sectionTitle/SectionTitle";
import BookTable from "@/shared/bookTable/BookTable";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import { useState } from "react";
import Pagination from "@/shared/pagination/Pagination";


const AllBooks = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    const { data, isLoading } = useGetBooksQuery({ page, limit }, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    });

    return (
        <div className="my-5">
            <SectionTitle title="All Books" />
            <BookTable tableData={data?.data || []} isLoading={isLoading} />
            {
                (page === 1 && data?.data?.length < 10) ? null :
                    <Pagination page={page} setPage={setPage} total={data?.total || 0} limit={limit} />
            }
        </div>
    );
};

export default AllBooks;