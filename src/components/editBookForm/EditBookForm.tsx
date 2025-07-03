import SectionTitle from "@/shared/sectionTitle/SectionTitle";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Spinner from "@/shared/spinner/Spinner";
import { useState } from "react";
import type { Book } from "@/interfaces";
import toast from "react-hot-toast";
import { useUpdateBookMutation } from "@/redux/api/baseApi";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    genre: z.string(),
    author: z.string().min(1, "Author is required"),
    isbn: z.string().min(1, "ISBN is required"),
    copies: z
        .number({ invalid_type_error: "Copies must be a number" })
        .positive("Must be a positive number"),
    description: z.string().min(1, "Description is required"),
});

const EditBookForm = ({ book, setEditModalOpen }: { book: Book; setEditModalOpen: (value: boolean) => void }) => {
    const [updateBook] = useUpdateBookMutation();
    const [loading, setLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: book?.title,
            genre: book?.genre,
            author: book?.author,
            isbn: book?.isbn,
            copies: book?.copies,
            description: book?.description,
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const updatedData = {
                id: book?._id,
                data
            };
            const res = await updateBook(updatedData);

            if (res?.data?.success === true) {
                setEditModalOpen(false);
                toast.success(res?.data?.message);
            };
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-5 px-3">
            <SectionTitle title="Edit Book" />
            <div className="bg-gray-600 p-3 my-2 rounded-md">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 text-white"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Book Title"
                                            {...field}
                                            className="focus:outline-none focus:ring-0 border border-white bg-gray-700 text-white"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col md:flex-row gap-5 w-full">
                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Author</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Author Name"
                                                {...field}
                                                className="focus:outline-none focus:ring-0 border border-white bg-gray-700 text-white"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="genre"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Genre</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Genre"
                                                {...field}
                                                className="focus:outline-none focus:ring-0 border border-white bg-gray-700 text-white"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-5 w-full">
                            <FormField
                                control={form.control}
                                name="isbn"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>ISBN</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Book ISBN"
                                                {...field}
                                                className="focus:outline-none focus:ring-0 border border-white bg-gray-700 text-white"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="copies"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel>Copies</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                placeholder="Book copies"
                                                {...field}
                                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                className="focus:outline-none focus:ring-0 border border-white bg-gray-700 text-white"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe about this book"
                                            className="resize-none focus:outline-none focus:ring-0 border border-white bg-gray-700 text-white"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="w-full flex justify-center">
                            <Button
                                type="submit"
                                disabled={loading}
                                className={`bg-white text-black hover:bg-gray-200 transition-colors font-semibold w-[60%] ${loading ? 'pointer-events-none cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                {loading ? <Spinner className="w-3 h-3" /> : 'Edit Book'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default EditBookForm;