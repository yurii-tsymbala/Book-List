import { Component } from '@angular/core';
import { take } from 'rxjs';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  private getBooks(): void {
    this.bookService.getBooks().pipe(take(1)).subscribe();
  }
}
