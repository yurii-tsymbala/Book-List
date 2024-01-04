import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Book } from 'src/app/shared/classes/Book';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  protected books$!: Observable<Book[]>;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.observeDishes();
  }

  private observeDishes(): void {
    this.bookService.getBooks().pipe(take(1)).subscribe();
    this.books$ = this.bookService.updatedBooks$;
  }

  editBook() {}

  toggleStatusBook() {}

  deleteBook() {}
}
