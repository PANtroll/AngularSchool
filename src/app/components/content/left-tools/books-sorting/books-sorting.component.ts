import {Component, OnInit} from '@angular/core';
import {BookService} from "../../../../core/book.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

interface SortingType {
  sortingType: FormControl<string>;
}

@Component({
  selector: 'as-books-sorting',
  templateUrl: './books-sorting.component.html',
  styleUrls: ['./books-sorting.component.scss']
})
export class BooksSortingComponent implements OnInit {


  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) {
  }

  sortingForm = new FormGroup<SortingType>({
    sortingType: new FormControl<string>("title", {nonNullable: true, validators: [Validators.required]}),
  })

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.sortingForm.setValue({sortingType: params['sortingType'] === undefined ? "title" : params['sortingType']});
      this.bookService.updateSorting(this.sortingForm.getRawValue().sortingType)
    })
  }

  sortingChange() {
    const filters = this.bookService.getFilters();
    this.router.navigate([], {
      queryParams: {
        sortingType: this.sortingForm.getRawValue().sortingType,
        title: filters[0],
        author: filters[1],
        publisher: filters[2],
        category: filters[3],
        status1: filters[4].includes("Dostępna"),
        status2: filters[4].includes("Zgubiona"),
        status3: filters[4].includes("Zniszczona")
      }
    }).then()
  }
}
