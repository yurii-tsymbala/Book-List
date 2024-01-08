export class Book {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public category: string,
    public isbn: string,
    public createdAt: number,
    public editedAt: number,
    public isActive: boolean = true
  ) {}
}
