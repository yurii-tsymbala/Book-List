import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/shared/classes/Book';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent {
  @Input() book!: Book;
  @Output() editBook = new EventEmitter<Number>();
  @Output() toggleStatusBook = new EventEmitter<Number>();
  @Output() deleteBook = new EventEmitter<Number>();

  editAction(): void {
    this.editBook.emit(this.book.id);
  }

  toggleStatusAction(): void {
    this.toggleStatusBook.emit(this.book.id);
  }

  deleteAction(): void {
    this.deleteBook.emit(this.book.id);
  }
}
