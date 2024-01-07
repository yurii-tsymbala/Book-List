import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Book } from 'src/app/shared/classes/Book';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  books$!: Observable<Book[]>;
  allBooks$!: Observable<number>;

  constructor(private bookService: BookService) {}

  selectedValue = 'Show Active';
  values = ['Show All', 'Show Active', 'Show Deactivated'];

  ngOnInit(): void {
    this.observeBooks();
  }

  private observeBooks(): void {
    this.bookService.filterStatus.next("Show Active");
    this.books$ = this.bookService.updatedBooks$;
    this.allBooks$ = this.bookService.allBooksLength$;
  }

  filterChanged() {
    switch (this.selectedValue) {
      case 'Show All': {
        this.bookService.filterStatus.next("Show All");
        this.bookService.getBooks().pipe(take(1)).subscribe();
        break;
      }
      case 'Show Active': {
        this.bookService.filterStatus.next("Show Active");
        this.bookService.getBooksByStatus(true).pipe(take(1)).subscribe();
        break;
      }
      case 'Show Deactivated': {
        this.bookService.filterStatus.next("Show Deactivated");
        this.bookService.getBooksByStatus(false).pipe(take(1)).subscribe();
        break;
      }
    }
  }
}
