import { Controller, Get, Param, Post, Body, Query, Delete, Patch, Logger } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book-dto';
import { Book } from './books.interface';

@Controller('books')
export class BooksController {
    constructor(private booksService: BooksService) { }

    @Post()
    async addBook(@Body() createBookDTO: CreateBookDTO): Promise<Book[]> {
        const books = await this.booksService.addBook(createBookDTO);
        return books;
    }

    @Get()
    async getBooks(): Promise<Book[]> {
        Logger.log('getting all books', BooksController.name);
        const books = await this.booksService.getBooks();
        return books;
    }

    @Get(':bookId')
    async getBook(@Param('bookId') bookId): Promise<Book> {
        Logger.log('getting one book', BooksController.name);
        const book = await this.booksService.getBook(bookId);
        return book;
    }

    @Patch(':bookId')
    async updateBook(@Param('bookId') bookId,  @Body() updateBookDTO: UpdateBookDTO): Promise<Book[]> {
        Logger.log('updating one book', BooksController.name);
        const books = await this.booksService.updateBook(bookId, updateBookDTO);

        return books;
    }

    @Delete()
    async deleteBook(@Query() query): Promise<Book[]> {
        Logger.log('deleting one book', BooksController.name);
        const books = await this.booksService.deleteBook(query.bookID);
        return books;
    }
}