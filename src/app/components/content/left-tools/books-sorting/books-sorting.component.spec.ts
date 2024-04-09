import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksSortingComponent } from './books-sorting.component';
import {BookService} from "../../../../core/book.service";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";

describe('BooksSortingComponent', () => {
  let component: BooksSortingComponent;
  let fixture: ComponentFixture<BooksSortingComponent>;
  beforeEach(async () => {
    const serviceMock = jasmine.createSpyObj(
      BookService, ['updateSorting','getFilters']
    )
    await TestBed.configureTestingModule({
      declarations: [BooksSortingComponent],
      providers: [{
        provide: BookService,
        useValue: serviceMock
      },{
        provide: ActivatedRoute,
        useValue:
          {
            queryParams: of([{}]),
          }
      }]
    })
      .compileComponents();
    fixture = TestBed.createComponent(BooksSortingComponent);
    component = fixture.componentInstance;
    component.ngOnInit()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
