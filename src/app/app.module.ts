import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ContentComponent } from './components/content/content.component';
import { BooksListComponent } from './components/content/books-list/books-list.component';
import { BookDetailsComponent } from './components/content/book-details/book-details.component';
import { BooksSortingComponent } from './components/content/left-tools/books-sorting/books-sorting.component';
import { BooksFilteringComponent } from './components/content/left-tools/books-filtering/books-filtering.component';
import { BookCreatingComponent } from './components/content/book-creating/book-creating.component';
import { LeftToolsComponent } from './components/content/left-tools/left-tools.component';
import { BookCardComponent } from './components/content/books-list/book-card/book-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, NavigationBarComponent, ContentComponent, BooksListComponent, BookDetailsComponent, BooksSortingComponent, BooksFilteringComponent, BookCreatingComponent, LeftToolsComponent, BookCardComponent, FooterComponent, BookFormComponent],
    imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
