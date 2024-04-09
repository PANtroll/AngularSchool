import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../core/book.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

interface FilteringType {
  title: FormControl<string>,
  author: FormControl<string>,
  publisher: FormControl<string>,
  category: FormControl<string>,
  status1: FormControl<boolean>,
  status2: FormControl<boolean>,
  status3: FormControl<boolean>,
}

@Component({
  selector: 'as-books-filtering',
  templateUrl: './books-filtering.component.html',
  styleUrls: ['./books-filtering.component.scss']
})
export class BooksFilteringComponent implements OnInit{

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) {
  }

  updateFilters() {
    const values = this.filteringForm.getRawValue();
    this.router.navigate([], {
      queryParams: {
        sortingType: this.bookService.getSorting(),
        title: values.title,
        author: values.author,
        publisher: values.publisher,
        category: values.category,
        status1: values.status1,
        status2: values.status2,
        status3: values.status3
      }
    }).then();
  }

  filteringForm = new FormGroup<FilteringType>({
    title: new FormControl<string>("", {nonNullable: true}),
    author: new FormControl<string>("", {nonNullable: true}),
    publisher: new FormControl<string>("", {nonNullable: true}),
    category: new FormControl<string>("", {nonNullable: true}),
    status1: new FormControl<boolean>(true, {nonNullable: true}),
    status2: new FormControl<boolean>(false, {nonNullable: true}),
    status3: new FormControl<boolean>(true, {nonNullable: true}),
  })

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filteringForm.setValue({
        title: params['title'] === undefined ? "" : params['title'],
        author: params['author'] === undefined ? "" : params['author'],
        publisher: params['publisher'] === undefined ? "" : params['publisher'],
        category: params['category'] === undefined ? "" : params['category'],
        status1: params['status1'] === undefined ? true : params['status1'] === "true",
        status2: params['status2'] === undefined ? false : params['status2'] === "true",
        status3: params['status3'] === undefined ? true : params['status3'] === "true"
      });
      const values = this.filteringForm.getRawValue();
      this.bookService.updateFilters([values.title, values.author, values.publisher, values.category, (values.status1 === true ? "Dostępna" : "") + (values.status2 === true ? "Zgubiona" : "") + (values.status3 === true ? "Zniszczona" : "")]);
    })
  }
}
