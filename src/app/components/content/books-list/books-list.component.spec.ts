import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { BooksListComponent } from './books-list.component';
import {Book} from "../../../core/Book";
import {BookService} from "../../../core/book.service";
import {of} from "rxjs";

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;

  beforeEach(async () => {
    const serviceMock = jasmine.createSpyObj(
      BookService, ['getBooks']
    )
    await TestBed.configureTestingModule({
      declarations: [BooksListComponent],
      providers: [{
        provide: BookService,
        useValue: serviceMock
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create list of books', fakeAsync(() =>{
    fixture.whenStable().then( () =>
    component.books$ = of([{title: "titleTest1"}, {title: "titleTest2"}] as Book[]));
    tick();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.bookList a')).toBeTruthy();
  }));
});
