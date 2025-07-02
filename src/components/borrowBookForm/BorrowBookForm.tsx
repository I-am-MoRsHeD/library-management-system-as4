import type { Book } from "@/interfaces";
import SectionTitle from "@/shared/sectionTitle/SectionTitle";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import Spinner from "@/shared/spinner/Spinner";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useNavigate } from "react-router";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    quantity: z
        .number({ invalid_type_error: "Quantity must be a number" })
        .positive("Must be a positive number"),
    dueDate: z.date(),
});

const BorrowBookForm = ({ selectedBook, setBorrowModalOpen }: { selectedBook: Book; setBorrowModalOpen: (value: boolean) => void }) => {
    const [borrowBook] = useBorrowBookMutation();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quantity: 1,
            dueDate: new Date(),
        },
    });
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const bookData = {
                book: selectedBook?._id,
                quantity: data.quantity,
                dueDate: data.dueDate
            };
            const res = await borrowBook(bookData);
            console.log(res);
            if (res?.data?.success === true) {
                setBorrowModalOpen(false);
                toast.success(res?.data?.message);
                navigate('/borrow-summary');
            };
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="my-5 px-3">
            <SectionTitle title="Borrow Book" width="w-28" />
            <div className="bg-gray-600 p-3 my-2 rounded-md">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 text-white"
                    >
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={1}
                                            placeholder="Book quantity"
                                            {...field}
                                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                            className="focus:outline-none focus:ring-0 border border-white bg-gray-700 text-white"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dueDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Due date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal bg-gray-700 text-white hover:bg-gray-500 cursor-pointer",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span className="text-white">Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-white" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date < new Date() || date < new Date("1900-01-01")
                                                }
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
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
                                {loading ? <Spinner className="w-3 h-3" /> : 'Borrow Book'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default BorrowBookForm;