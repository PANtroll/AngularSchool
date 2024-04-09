import {Component} from '@angular/core';
import {BookService} from "../../../core/book.service";
import {Router} from "@angular/router";

@Component({
  selector: 'as-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent {
  constructor(private router: Router, private bookService: BookService) {
  }

  books$ = this.bookService.getBooks()
}