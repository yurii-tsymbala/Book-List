import { Category } from "./Category";

export class Book {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public category: Category,
    public isbn: string,
    public createdAt: string,
    public editedAt: string,
    public isActive: boolean = true
  ) {}
}

/*
ISBN format 0-061-96436-0
Created At (datetime format should follow pattern: 12 March 2022, 8:35AM)
Edited  At (datetime format should follow pattern: 13 March 2022, 1:48PM)
column “Actions” -  should have 3 different buttons “Edit”, “Delete”, “Deactivate/Re-Activate”.
*/
