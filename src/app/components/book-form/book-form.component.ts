import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book, NewBook} from "../../core/Book";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {BookService} from "../../core/book.service";
import {Router} from "@angular/router";

interface BookForm {
  img: FormControl<string>;
  title: FormControl<string>;
  author: FormControl<string>;
  publisher: FormControl<string>;
  category: FormControl<string>;
  date: FormControl<string>;
  isbn: FormControl<string>;
  description: FormControl<string>;
  status: FormControl<string>;
}

@Component({
  selector: 'as-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  @Input()
  book!: Book

  @Output()
  isDirty = new EventEmitter<boolean>();

  constructor(private router: Router, private bookService: BookService){
  }

  bookForm = new FormGroup<BookForm>({
    img: new FormControl<string>("", {nonNullable: true, validators: [Validators.required, isURLValid()]}),
    title: new FormControl<string>("", {nonNullable: true, validators: [Validators.required, Validators.maxLength(120)]}),
    author: new FormControl<string>("", {nonNullable: true, validators: [Validators.required, Validators.maxLength(120)]}),
    publisher: new FormControl<string>("", {nonNullable: true, validators: [Validators.required, Validators.maxLength(120)]}),
    category: new FormControl<string>("", {nonNullable: true, validators: [Validators.required]}),
    date: new FormControl<string>("", {nonNullable: true, validators: [Validators.required]}),
    isbn: new FormControl<string>("", {nonNullable: true, validators: [Validators.required, isISBNValid()]}),
    description: new FormControl<string>("", {nonNullable: true, validators: [Validators.required]}),
    status: new FormControl<string>("", {nonNullable: true, validators: [Validators.required]}),
  });

  ngOnInit() {
    if (this.book !== undefined) {
      this.bookForm.get("img")?.setValue(this.book.img);
      this.bookForm.get("title")?.setValue(this.book.title);
      this.bookForm.get("author")?.setValue(this.book.author);
      this.bookForm.get("publisher")?.setValue(this.book.publisher);
      this.bookForm.get("category")?.setValue(this.book.category);
      this.bookForm.get("date")?.setValue(this.book.date);
      this.bookForm.get("isbn")?.setValue(this.book.isbn);
      this.bookForm.get("isbn")?.disable();
      this.bookForm.get("description")?.setValue(this.book.description);
      this.bookForm.get("status")?.setValue(this.book.status);
    }
  }

  isDirtyForm() {
    this.isDirty.emit(this.bookForm.dirty);
  }

  send() {
    this.isDirty.emit(false);
    if (this.book === undefined) {
      const newBook: NewBook = this.bookForm.getRawValue();
      this.bookService.addBook(newBook).subscribe((addedBook) => {
        this.router.navigate([`book/${addedBook.id}/${addedBook.title.replaceAll(" ", "_")}`]).then(() => {
          window.location.reload();
        });
      });
    } else {
      const bookFromForm: NewBook = this.bookForm.getRawValue();
      this.bookService.editBook(this.book.id.toString(), bookFromForm).subscribe((editedBook) => {
        this.router.navigate([`book/${editedBook.id}/${editedBook.title.replaceAll(" ", "_")}`]).then(() => {
          window.location.reload();
        });
      });
    }
  }

}

function isISBNValid() {
  return function (control: AbstractControl): ValidationErrors | null {
    const isbn: string = control.value;
    if (isbn === "") return {error: "Pole wymagane"};
    if (isbn.length != 13)
      return {error: "Zła długość"};
    let sum: number = 0;
    for (let i = 0; i < 12; i++) {
      let digit: number = +isbn[i];
      if (i % 2 == 1) {
        sum += 3 * digit;
      } else {
        sum += digit;
      }
    }
    return ((10 - (sum % 10)) % 10 === +isbn.charAt(isbn.length - 1)) ? null : {error: "Zła suma kontrolna"};
  }
}

function isURLValid() {
  return function (control: AbstractControl): ValidationErrors | null {
    const url: string = control.value;
    if (url === "") return {error: "Pole wymagane"}
    const regex: string = "[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)";
    if (url.match(regex))
      return null;
    return {error: "Nieprawidłowy URL"};
  }
}