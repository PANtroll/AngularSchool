import {TestBed} from '@angular/core/testing';

import { BookService } from './book.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Book} from "./Book";
import {BehaviorSubject} from "rxjs";

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    })
      .compileComponents();
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should get all data', () => {
    const httpController: HttpTestingController = TestBed.get(HttpTestingController);
    service.getAll().subscribe();
    httpController.expectOne('http://localhost:3000/book').flush([{title: "test"}] as Book[]);
    httpController.verify();
  });
  it('should get one book', () => {
    const httpController: HttpTestingController = TestBed.get(HttpTestingController);
    service.findBook("1").subscribe();
    httpController.expectOne('http://localhost:3000/book/1').flush({title: "test"} as Book);
    httpController.verify();
  });
  it('should update book', () => {
    const httpController: HttpTestingController = TestBed.get(HttpTestingController);
    service.editBook("1", {title: "test"} as Book).subscribe();
    httpController.expectOne('http://localhost:3000/book/1').flush({title: "test"} as Book);
    httpController.verify();
  });
  it('should update status of book', () => {
    const httpController: HttpTestingController = TestBed.get(HttpTestingController);
    service.updateStatus("1", {status: "test"} as Book);
    httpController.expectOne('http://localhost:3000/book/1');
    httpController.verify();
  });
  it('should get filter subject', () => {
    service.filters$ = new BehaviorSubject<string[]>(['test'])
    expect(service.getFilters()).toEqual(['test']);
  });
  it('should get sort subject', () => {
    service.sorting$ = new BehaviorSubject<string>('test')
    expect(service.getSorting()).toEqual('test');
  });
  it('should set filter subject', () => {
    service.updateFilters(['test']);
    expect(service.filters$.value).toEqual(['test']);
  });
  it('should set sort subject', () => {
    service.updateSorting('test');
    expect(service.sorting$.value).toEqual('test');
  });
});
