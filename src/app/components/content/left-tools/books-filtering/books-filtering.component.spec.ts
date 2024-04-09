import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksFilteringComponent } from './books-filtering.component';
import {BookService} from "../../../../core/book.service";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";

describe('BooksFilteringComponent', () => {
  let component: BooksFilteringComponent;
  let fixture: ComponentFixture<BooksFilteringComponent>;

  beforeEach(async () => {
    const serviceMock = jasmine.createSpyObj(
      BookService, ['findBook', 'updateFilters']
    )
    await TestBed.configureTestingModule({
      declarations: [BooksFilteringComponent],
      providers: [{
        provide: BookService,
        useValue: serviceMock
      },{
        provide: ActivatedRoute,
        useValue:
          {
            queryParams: of([{title: 'test', author: 'test', publisher: 'test', status: 'test', category: 'test'}]),
          }
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BooksFilteringComponent);
    component = fixture.componentInstance;
    component.ngOnInit()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
