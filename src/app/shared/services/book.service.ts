import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { Book } from '../classes/Book';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly apiURL = 'http://localhost:3000/books';
  private books$ = new BehaviorSubject<Book[]>([]);
  readonly updatedBooks$ = this.books$.asObservable();

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiURL).pipe(
      tap((value) => {
        this.books$.next(value);
      })
    );
  }

  addBook(book: Book): Observable<Book[]> {
    return this.http
      .post<Book[]>(this.apiURL, book)
      .pipe(switchMap(() => this.getBooks()));
  }

  updateBookById(book: Book): Observable<Book[]> {
    return this.http
      .post<Book[]>(this.apiURL, book)
      .pipe(switchMap(() => this.getBooks()));
  }

  deleteBookById(book: Book): Observable<Book[]> {
    return this.http
      .delete<Book[]>(`${this.apiURL}/${book.id}`)
      .pipe(switchMap(() => this.getBooks()));
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiURL}/${id}`);
  }
}
