import { TestBed } from '@angular/core/testing';

import { BookResolverResolver } from './book-resolver-resolver.service';
import {BookService} from "./core/book.service";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";

describe('BookResolverResolver', () => {
  let resolver: BookResolverResolver;

  beforeEach(async () => {
    const serviceMock = jasmine.createSpyObj(
      BookService, ['findBook']
    )
    await TestBed.configureTestingModule({
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
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BookResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
