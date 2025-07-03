import { useGetBookQuery } from "@/redux/api/baseApi";
import Spinner from "@/shared/spinner/Spinner";
import { useParams } from "react-router";


const SingleBook = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetBookQuery(id);

    return (
        <>
            {isLoading ? <div className="flex justify-center my-5">
                <Spinner className="w-6 h-6" />
            </div> : <div>
                <div className="flex flex-row gap-5 my-3">
                    <h1><span className="font-bold">Title : </span>{data?.data?.title}</h1>
                    <h1><span className="font-bold">Author : </span>{data?.data?.author}</h1>
                </div>
                <div className="flex flex-row gap-5 my-3">
                    <h1><span className="font-bold">Genre : </span>{data?.data?.genre}</h1>
                    <h1><span className="font-bold">ISBN : </span>{data?.data?.isbn}</h1>
                </div>
                <div>
                    <p> <span className="font-bold">About this book : </span>{data?.data?.description}</p>
                </div>
            </div>}
        </>
    );
};

export default SingleBook;