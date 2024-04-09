import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookFormComponent } from './book-form.component';
import {BookService} from "../../core/book.service";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;

  beforeEach(async () => {
    const serviceMock = jasmine.createSpyObj(
      BookService, ['addBook']
    )
    await TestBed.configureTestingModule({
      declarations: [BookFormComponent],
      providers: [{
        provide: BookService,
        useValue: serviceMock
      },{
        provide: ActivatedRoute,
        useValue:
          {
            data: of([{id:1}]),
          }
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
