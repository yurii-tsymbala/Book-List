import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/shared/classes/Book';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  books$!: Observable<Book[]>;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.observeBooks();
  }

  private observeBooks(): void {
    this.books$ = this.bookService.updatedBooks$;
  }

  editAction() {
    
  }

  toggleStatusAction() {
    
  }

  deleteAction() {
    
  }
}
