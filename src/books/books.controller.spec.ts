import { BooksController } from './books.controller';
import { BooksService } from './books.service';


describe('Books Controller', () => {
  let controller: BooksController;
  let service : BooksService;

  beforeEach(() => {
    service = new BooksService(); 
    controller = new BooksController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
