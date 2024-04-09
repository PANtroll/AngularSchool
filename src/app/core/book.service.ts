import {Injectable} from '@angular/core';
import {Book, NewBook} from "./Book";
import {BehaviorSubject, debounceTime, map, merge, Observable, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  filters$ = new BehaviorSubject(["", "", "", "", "DostępnaZniszczona"])

  sorting$ = new BehaviorSubject("title");

  updateFilters(filters: string[]) {
    this.filters$.next(filters);
  }

  getFilters() {
    return this.filters$.value;
  }

  updateSorting(sorting: string) {
    this.sorting$.next(sorting);
  }

  getSorting() {
    return this.sorting$.value;
  }


  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>("http://localhost:3000/book");

  }

  getBooks(): Observable<Book[]> {
    return merge(this.filters$, this.sorting$).pipe(map(() => this.getAll()),
      debounceTime(1000),
      switchMap(obs => obs.pipe(map(books => books.sort((a: Book, b: Book) =>
        (a[this.sorting$.value as keyof Book]).toString().localeCompare(b[this.sorting$.value as keyof Book] as string))
        .filter(book => book.title.toLowerCase().includes(this.filters$.value[0].toLowerCase()))
        .filter(book => book.author.toLowerCase().includes(this.filters$.value[1].toLowerCase()))
        .filter(book => book.publisher.toLowerCase().includes(this.filters$.value[2].toLowerCase()))
        .filter(book => book.category.includes(this.filters$.value[3]))
        .filter(book => this.filters$.value[4].includes(book.status))
      ))));
  }

  findBook(id: string): Observable<Book> {
    return this.http.get<Book>(`http://localhost:3000/book/${id}`);
  }

  addBook(book: NewBook): Observable<Book> {
    return this.http.post<Book>(`http://localhost:3000/book/`, book);
  }

  editBook(id: string, book: NewBook): Observable<Book> {
    return this.http.put<Book>(`http://localhost:3000/book/${id}`, book);
  }

  updateStatus(id: string, status: any) {
    return this.http.patch<Book>(`http://localhost:3000/book/${id}`, status).subscribe();
  }
}
