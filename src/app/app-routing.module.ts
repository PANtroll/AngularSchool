import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {BookDetailsComponent} from "./components/content/book-details/book-details.component";
import {BookCreatingComponent} from "./components/content/book-creating/book-creating.component";
import {ContentComponent} from "./components/content/content.component";
import {BookResolverResolver} from "./book-resolver-resolver.service";
import {NotSavedGuardGuard} from "./not-saved-guard.guard";

const routes: Routes = [
  { path: "books", component: ContentComponent, data: { title: "All books" } },
  { path: "book/create", component: BookCreatingComponent, canDeactivate: [ NotSavedGuardGuard ], data: { title: "Add new book" } },
  { path: "book/:id/:title", component: BookDetailsComponent, resolve: {book: BookResolverResolver}, data: { title: "Book details" } },
  { path: "", redirectTo: "/books", pathMatch: "full" },
  { path: "**", redirectTo: "/books"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}