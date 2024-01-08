import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Book } from 'src/app/shared/classes/Book';
import { Category } from 'src/app/shared/classes/Category';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  @Input()
  set id(bookId: number) {
    this.bookService
      .getBookById(bookId)
      .pipe(take(1))
      .subscribe((book) => {
        this.book = book;
        this.configureData();
      });
  }
  isEditMode = false;
  errorInfo = '';
  values = Object.values(Category);
  book!: Book;
  reactiveForm!: FormGroup;

  constructor(private bookService: BookService, public router: Router) {}

  ngOnInit(): void {
    this.configureForm();
  }

  private configureForm(): void {
    this.reactiveForm = new FormGroup({
      titleInput: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      authorInput: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      categoryInput: new FormControl('Horror',[
        Validators.required,
      ]),
      isbnInput: new FormControl('', [
        Validators.required,
        Validators.minLength(13),
      ]),
      isActiveInput: new FormControl(true),
    });
  }

  private configureData(): void {  
    this.isEditMode = true;
    this.reactiveForm.controls['titleInput'].setValue(this.book.title);
    this.reactiveForm.controls['authorInput'].setValue(this.book.author);
    this.reactiveForm.controls['categoryInput'].setValue(this.book.category);
    this.reactiveForm.controls['isbnInput'].setValue(this.book.isbn);
    this.reactiveForm.controls['isActiveInput'].setValue(this.book.isActive);
  }

  toggleStatusAction() {
    this.reactiveForm.controls['isActiveInput'].setValue(
      this.reactiveForm.value.isActiveInput as boolean
    );
  }

  onSubmit() {
    this.errorInfo = '';
    const titleInput = this.reactiveForm.value.titleInput;
    const authorInput = this.reactiveForm.value.authorInput;
    const categoryInput = this.reactiveForm.value.categoryInput;
    const isbnInput = this.reactiveForm.value.isbnInput;
    const isActiveInput = this.reactiveForm.value.isActiveInput;
    if (this.reactiveForm.valid) {
      if (this.isEditMode) {
        this.bookService
          .updateBookById(
            new Book(
              this.book.id,
              titleInput,
              authorInput,
              categoryInput,
              isbnInput,
              this.book.createdAt,
              Date.now(),
              isActiveInput
            )
          )
          .pipe(take(1))
          .subscribe({
            complete() {
              alert('Successfully updated the book');
            },
          });
        this.router.navigate(['/']);
      } else {
        this.bookService
          .addBook(
            new Book(
              Math.random(),
              titleInput,
              authorInput,
              categoryInput,
              isbnInput,
              Date.now(),
              -1,
              isActiveInput
            )
          )
          .pipe(take(1))
          .subscribe({
            complete() {
              alert('Successfully added new book');
            },
          });
        this.router.navigate(['/']);
      }
    } else {
      if (titleInput <= 2) {
        this.errorInfo = 'Title input is too short. ';
      }
      if (authorInput <= 5) {
        this.errorInfo = 'Author input is too short. ';
      }
      if (titleInput <= 2 && authorInput <= 5) {
        {
          this.errorInfo = 'Title and Author inputs are too short. ';
        }
      }
      this.isbnValidate();
    }
  }

  private isbnValidate(): void {
    let isbnValue = this.reactiveForm.value.isbnInput;
    let subject = isbnValue;

    let regex =
      /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;

    if (regex.test(subject)) {
      let chars = subject.replace(/[- ]|^ISBN(?:-1[03])?:?/g, '').split('');
      let last = chars.pop();
      let sum = 0;
      let check, i;

      if (chars.length == 9) {
        chars.reverse();
        for (i = 0; i < chars.length; i++) {
          sum += (i + 2) * parseInt(chars[i], 10);
        }
        check = 11 - (sum % 11);
        if (check == 10) {
          check = 'X';
        } else if (check == 11) {
          check = '0';
        }
      } else {
        for (i = 0; i < chars.length; i++) {
          sum += ((i % 2) * 2 + 1) * parseInt(chars[i], 10);
        }
        check = 10 - (sum % 10);
        if (check == 10) {
          check = '0';
        }
      }

      if (check != last) {
        this.errorInfo += '';
      } else {
        this.errorInfo += 'Check digits in ISBN';
      }
    } else {
      this.errorInfo += 'Not valid ISBN Format';
    }
  }
}
