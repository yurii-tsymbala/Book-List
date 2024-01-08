import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Book } from 'src/app/shared/classes/Book';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  books$!: Observable<Book[]>;

  constructor(private bookService: BookService, public router: Router) {}

  ngOnInit(): void {
    this.observeBooks();
  }

  private observeBooks(): void {
    this.books$ = this.bookService.updatedBooks$;
  }

  editAction(book: Book) {
    this.router.navigate(['/add/'], {
      queryParams: { id: book.id },
    });
  }

  toggleAction(book: Book) {
    this.bookService.updateBookById(book).pipe(take(1)).subscribe();
  }

  deleteAction(book: Book) {
    this.bookService
      .deleteBookById(book)
      .pipe(take(1))
      .subscribe({
        complete() {
          alert('Successfully deleted the book');
        },
      });
  }
}
