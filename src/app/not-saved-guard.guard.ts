import { Injectable } from '@angular/core';
import {CanDeactivate} from "@angular/router";
import {BookCreatingComponent} from "./components/content/book-creating/book-creating.component";

@Injectable({
  providedIn: 'root'
})
export class NotSavedGuardGuard implements CanDeactivate<BookCreatingComponent> {
  canDeactivate(component: BookCreatingComponent): boolean {
    return component.isDirtyForm ? confirm("czy chcesz porzucić dane?") : true;
  }
}
