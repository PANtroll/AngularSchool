import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import {BookService} from "../../../core/book.service";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {Book} from "../../../core/Book";

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  beforeEach(async () => {
    const serviceMock = jasmine.createSpyObj(
      BookService, ['findBook', 'updateStatus']
    )
    await TestBed.configureTestingModule({
      declarations: [BookDetailsComponent],
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

    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    component.book$ = of({title: "titleTest1"} as Book);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should displaying details', () => {
    component.isEdit = false
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.container div')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('as-book-form')).toBeFalsy();
  });

  it('should displaying edit form', () => {
    component.isEdit = true
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.container div')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('as-book-form')).toBeTruthy();
  });

  it('should change isEdit value', () => {
    component.showEdit();
    fixture.detectChanges();
    expect(component.isEdit).toEqual(true);
  });

  it('should change isStatusEdit value', () => {
    component.editStatus();
    fixture.detectChanges();
    expect(component.isStatusEdit).toEqual(true);
  });

  it('should change status', fakeAsync(() => {
    spyOn(component, 'resolveAfter300MiliSeconds').and.returnValue(new Promise(() =>{}))
    component.changeStatus();
    fixture.detectChanges();
    tick()
    expect(component.resolveAfter300MiliSeconds).toHaveBeenCalled();
  }));
  it('should set status value on select', fakeAsync(() => {
    component.book$ = of({status: 'Dostępna'} as Book);
    fixture.detectChanges();
    tick();
    expect(fixture.nativeElement.querySelector('#status').selectedOptions[0].textContent).toEqual("Dostępna");
  }));
});
