import { Injectable, HttpException } from '@nestjs/common';
import { Book } from './books.interface';
import { BOOKS } from '../mocks/books.mock';


@Injectable()
export class BooksService {
  private books = BOOKS;

  async addBook(book: Book): Promise<Book[]> {
    this.books = [...this.books, {...book}];

    return Promise.resolve(this.books);
  }

  async getBooks() : Promise <Book[]> {
    return Promise.resolve(this.books);
  }

  async getBook(bookId: number): Promise<Book> {
    const id = Number(bookId);
    const book = this.books.find(item => item.id === id);

    if (!book) {
      throw new HttpException('book does not exists!', 404);
    }

    return Promise.resolve(book);
  }

  async updateBook (bookId: number, book: Book): Promise<Book[]> {
    const id = Number(bookId);
    
    const existingBook = this.books.find(item => item.id === id);

    if (!existingBook) {
      throw new HttpException('book does not exists!', 404);
    }

    this.books = this.books.map(item => {
      if (item.id === id) {
        return { ...item, ...book };
      }

      return item;
    });

    return Promise.resolve(this.books);
  }

  async deleteBook(bookId: number): Promise<Book[]> {
    const id = Number(bookId);
    const index =  this.books.findIndex(item => item.id === id);
    if (index === -1) {
      throw new HttpException('book does not exists!', 404);
    }

    this.books = this.books.filter(item => item.id !== bookId);

    return Promise.resolve(this.books);
  }
}
