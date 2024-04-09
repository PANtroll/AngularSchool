import {Component} from '@angular/core';

@Component({
  selector: 'as-book-creating',
  templateUrl: './book-creating.component.html',
  styleUrls: ['./book-creating.component.scss']
})
export class BookCreatingComponent {
  isDirtyForm: boolean = false;

  setDirty(event: boolean) {
    this.isDirtyForm = event;
  }

}
