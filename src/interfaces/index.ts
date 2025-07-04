export interface Book {
    _id: string;
    title: string;
    author: string;
    genre: string;
    isbn: string;
    copies: number;
    description: string;
    available: boolean;
};

export interface BorrowedBook {
    _id: string;
    totalQuantity: number;
    book: Book
};

export interface ErrorMessage {
    path: string;
    message: string;
};

export interface ErrorResponse {
    success: false;
    message: string;
    errorMessages: ErrorMessage[];
};
