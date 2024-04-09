import {Component} from '@angular/core';
import {Book} from "../../../core/Book";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable} from "rxjs";
import {BookService} from "../../../core/book.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

interface statusFormType {
  bookId: FormControl<string>
  status: FormControl<string>
}

@Component({
  selector: 'as-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  isEdit = false;

  isStatusEdit = false;

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService) {
  }

  book$: Observable<Book> = this.route.data.pipe(map((data) => data["book"] as Book));

  statusForm = new FormGroup<statusFormType>({
    bookId: new FormControl<string>("-1", {nonNullable: true, validators: [Validators.required]}),
    status: new FormControl<string>("", {nonNullable: true, validators: [Validators.required]})
  });

  showEdit() {
    this.isEdit = true;
  }

  editStatus() {
    this.isStatusEdit = true;
  }

  changeStatus() {
    const values = this.statusForm.value;
    this.bookService.updateStatus(values.bookId!, {"status": values.status});
    this.resolveAfter300MiliSeconds().then(() =>
      window.location.reload())
  }

  resolveAfter300MiliSeconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(20);
      }, 300);
    });
  }
}
