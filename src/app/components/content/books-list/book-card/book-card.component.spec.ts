import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookCardComponent} from './book-card.component';
import {Book} from "../../../../core/Book";

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    component.book = {
      img: "imgTest",
      title: "testTitle",
      author: "testAuthor",
      category: "testCategory",
      status: "Dostępna"
    } as Book
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create successful badge', () => {
    expect(fixture.nativeElement.querySelector('.card-body .text-bg-success').textContent).toEqual("Dostępna");
  });
  it('should create warning badge', () => {
    component.book = {
      img: "imgTest",
      title: "testTitle",
      author: "testAuthor",
      category: "testCategory",
      status: "Zniszczona"
    } as Book
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.card-body .text-bg-warning').textContent).toEqual("Zniszczona");
  });
  it('should create secondary badge', () => {
    component.book = {
      img: "imgTest",
      title: "testTitle",
      author: "testAuthor",
      category: "testCategory",
      status: "Zgubiona"
    } as Book
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.card-body .text-bg-secondary').textContent).toEqual("Zgubiona");
  });
});
