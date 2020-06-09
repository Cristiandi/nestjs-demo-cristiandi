import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Query,
    Delete,
    Patch,
    Logger,
    UseFilters,
    UsePipes,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';

import { Book } from './books.interface';

import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
import { GetBookDTO } from './dto/get-book.dto';

import { createSchema } from './schemas/create-book.schema';

import { BooksService } from './books.service';

import { HttpExceptionFilter } from '../common/exception-filters/http-exception.filter';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';



@Controller('books')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(LoggingInterceptor)
export class BooksController {
    constructor(private booksService: BooksService) { }

    @Post()
    @Roles('admin')
    @UsePipes(new JoiValidationPipe(createSchema.body))
    @UseGuards(RolesGuard)
    async addBook(@Body() createBookDTO: CreateBookDTO): Promise<Book[]> {
        const books = await this.booksService.addBook(createBookDTO);
        return books;
    }

    @Get()
    @UseInterceptors(TransformInterceptor)
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
    async updateBook(@Param(new ValidationPipe()) params: GetBookDTO,  @Body(new ValidationPipe()) updateBookDTO: UpdateBookDTO): Promise<Book[]> {
        const { bookId } = params;
        Logger.log(`updating one book ${bookId}`, BooksController.name);
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