import {Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {Book} from "./core/Book";
import {BookService} from "./core/book.service";

@Injectable({
  providedIn: 'root'
})
export class BookResolverResolver implements Resolve<Book> {
  constructor(private bookService: BookService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const bookId = route.paramMap.get("id") as string;
    return this.bookService.findBook(bookId);
  }
}
