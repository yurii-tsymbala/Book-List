import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/shared/classes/Book';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent {
  @Input() book!: Book;
  @Output() editBook = new EventEmitter<Book>();
  @Output() toggleBook = new EventEmitter<Book>();
  @Output() deleteBook = new EventEmitter<Book>();

  editAction(): void {
    this.editBook.emit(this.book);
  }

  toggleStatusAction(): void {
    this.book.isActive = !this.book.isActive;
    this.toggleBook.emit(this.book);
  }

  deleteAction(): void {
    this.deleteBook.emit(this.book);
  }
}
