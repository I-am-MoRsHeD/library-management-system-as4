import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    isbn: z.string().min(1, "ISBN is required"),
    copies: z
        .number({ invalid_type_error: "Copies must be a number" })
        .positive("Must be a positive number"),
    description: z.string().min(100, "Description is required"),
});

const AddBookForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            author: "",
            isbn: "",
            copies: 1,
            description: "",
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
    };

    return (
        <div className="my-5">
            <h3 className="border-b-[2px] border-black w-20 text-center rounded-b-xl">
                Add Book
            </h3>
            <div className="bg-gray-600 p-3 my-2 rounded-md">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 text-white"
                    >
                        <div className="flex flex-col lg:flex-row gap-5 w-full">
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
                        </div>
                        <div className="flex flex-col lg:flex-row gap-5 w-full">
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
                                                pattern="[1-9][0-9]*"
                                                min={1}
                                                placeholder="Book copies"
                                                {...field}
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
                                className="bg-white text-black hover:bg-gray-200 transition-colors font-semibold w-[60%] cursor-pointer"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default AddBookForm;
