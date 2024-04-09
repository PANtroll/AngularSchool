import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCreatingComponent } from './book-creating.component';

describe('BookCreatingComponent', () => {
  let component: BookCreatingComponent;
  let fixture: ComponentFixture<BookCreatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookCreatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCreatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should setDirty change isDirty value', () => {
    component.setDirty(true);
    fixture.detectChanges();
    expect(component.isDirtyForm).toEqual(true);
  });
});
