class Library {
    constructor() {
        this.books = [];
    }
}

class Book {
    constructor(
      Title = '',
      Author = '',
      Pages = '0',
      IsRead = false
    ) {
      this.Title = Title
      this.Author = Author
      this.Pages = Pages
      this.IsRead = IsRead
    }
  }

function addBook(newBook) {
    library.books.push(newBook)
    localStorage.setItem('libraryList', JSON.stringify(library.books));
}

function generateTableHead(table, book) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of book) {
    let th = document.createElement('th')
    let text = document.createTextNode(key)
    th.appendChild(text)
    row.appendChild(th)
  }
  let th = document.createElement('th')
  row.appendChild(th)
}

function generateTableData(table, data) {
  for (let book of data) {
    let row = table.insertRow();
    for (key in book) {
      let cell = row.insertCell();
      let text = document.createTextNode(book[key]);
      cell.appendChild(text)
    }
    let cell = row.insertCell();
    let deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'Remove'
    cell.appendChild(deleteButton)
    row.appendChild(cell)
  }
}

function findBook(library, title) {
  if (library.length === 0 || library === null) {
    return;
  }
  for (book of library)
    if (book.title === title) {
      return library.indexOf(book);
    }
}

function removeBook(currentBook) {
  table.deleteRow(currentBook + 1)
  library.books.splice(currentBook, 1)
  localStorage.setItem('libraryList', JSON.stringify(library.books));
}

let library = new Library;

book1 = new Book('someTitle1', 'someAuthor1', 'somePages1', 'true')
book2 = new Book('someTitle2', 'someAuthor2', 'somePages2', 'true')
book3 = new Book('someTitle3', 'someAuthor3', 'somePages3', 'true')

addBook(book1)
addBook(book2)
addBook(book3)

library.books = JSON.parse(localStorage.getItem('libraryList'));

console.log(library.books)

const $title = document.querySelector("#inputTitle");
const $author = document.querySelector("#inputAuthor");
const $pages = document.querySelector("#inputPages")
const $status = document.querySelector("#inputReadStatus");

let table = document.querySelector('table');
let data = Object.keys(library.books[0])
generateTableData(table, library.books)
generateTableHead(table, data);

table.addEventListener("click", (e) => {
    let rowTarget = e.target.parentNode.parentNode.childNodes[0];
    if (e.target.innerHTML == "Remove") {
      removeBook(findBook(library.books, rowTarget.innerText))
    }
  });

const $form = document.querySelector("form").addEventListener("submit", (e) => {
  console.log('pressing submit')
  let newBook = new Book($title.value, $author.value, $pages.value, $status.value);
  addBook(newBook)

});