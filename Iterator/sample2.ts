// interface Iterator {
//   hasNext(): boolean;
//   next(): any;
// }

// interface Aggregate {
//   iterator(): Iterator;
// }

class Book {
  constructor(private name: string) {}

  public getName() {
    return this.name;
  }
}

class BookShelf implements Aggregate {
  private books: Book[];
  constructor(private last: number) {}

  public getBookAt(index: number) {
    return this.books[index];
  }

  public appendBook(book: Book) {
    this.books[this.last] = book;
    this.last++;
  }

  public getLength() {
    return this.last;
  }

  public iterator() {
    return new BookShelfIterator(this);
  }
}

class BookShelfIterator implements Iterator {
  constructor(private bookShelf: BookShelf, private index: number = 0) {}

  public hasNext() {
    return this.index < this.bookShelf.getLength() ? true : false;
  }

  public next() {
    const book = this.bookShelf.getBookAt(this.index);
    this.index++;
    return book;
  }
}

const bookShelf = new BookShelf(4);
bookShelf.appendBook(new Book("Around the World in 80 Days"));
bookShelf.appendBook(new Book("Bible"));
bookShelf.appendBook(new Book("Cinderella"));
bookShelf.appendBook(new Book("Daddy-Long-Legs"));

const it: Iterator = bookShelf.iterator();
while (it.hasNext()) {
  let book: Book = it.next();
  console.log(book.getName());
}
