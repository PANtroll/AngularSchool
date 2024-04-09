import {Component, Input} from '@angular/core';
import {Book} from "../../../../core/Book";

@Component({
  selector: 'as-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input()
  book!: Book


}