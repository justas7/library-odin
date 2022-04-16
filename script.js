"use strict";

let addBtn = document.querySelector("#addBtn");
let modalBtn = document.querySelector(".modalBtn");
let closeBtn = document.querySelector(".closeBtn");
let modal = document.querySelector(".modal");
let booksContainer = document.querySelector(".books-container");
let id = 0;

class Book {
  constructor(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  static newBook = function () {
    this.title = document.querySelector("#title").value;
    this.author = document.querySelector("#author").value;
    this.pages = document.querySelector("#pages").value;
    this.read = document.querySelector('input[name="read"]').checked;

    let book = new Book(id, this.title, this.author, this.pages, this.read);
    id++;
    return book;
  };
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    console.log("Book added");
  }
}

let myLibrary = new Library();

let reset = (function () {
  let inputs = function () {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector('input[name="read"]').checked = false;
  };

  return { inputs };
})();

let displayController = (function () {
  let createCard = function (e) {
    let book = Book.newBook();
    myLibrary.addBook(book);

    let _card = document.createElement("div");
    let _header = document.createElement("h2");
    let _author = document.createElement("p");
    let _pages = document.createElement("p");
    let _read = document.createElement("p");
    let _deleteBtn = document.createElement("button");
    let _statusBtn = document.createElement("button");

    let _statusToggle = function (e) {
      let id = Number(e.target.getAttribute("data-id"));
      myLibrary.books.forEach((book) => {
        if (book.id === id) {
          book.read === false ? (book.read = true) : (book.read = false);
          _read.textContent = `Have read it:  ${book.read === true ? "Yes" : "No"}`;
        }
      });
    };
    let _deleteBook = function (e) {
      let id = e.target.getAttribute("data-id");
      let card = document.querySelector(`div[data-id="${id}"]`);
      card.remove();
      myLibrary.books.forEach((book) => {
        if (book.id === Number(id)) {
          myLibrary.books.splice(myLibrary.books.indexOf(book), 1);
        }
      });
    };

    _read.setAttribute("id", "read");
    _deleteBtn.textContent = "Delete";
    _statusBtn.textContent = "Status";
    _deleteBtn.setAttribute("data-id", book.id);
    _statusBtn.setAttribute("data-id", book.id);
    _card.setAttribute("data-id", book.id);

    _header.textContent = `${book.title}`;
    _author.textContent = `By ${book.author}`;
    _pages.textContent = `Pages: ${book.pages}`;
    _read.textContent = `Have read it:  ${book.read === true ? "Yes" : "No"}`;

    _card.classList.add("card");
    _deleteBtn.classList.add("btn");
    _statusBtn.classList.add("btn");

    _card.appendChild(_header);
    _card.appendChild(_author);
    _card.appendChild(_pages);
    _card.appendChild(_read);

    _card.appendChild(_statusBtn);
    _card.appendChild(_deleteBtn);

    booksContainer.appendChild(_card);
    _statusBtn.addEventListener("click", _statusToggle);
    _deleteBtn.addEventListener("click", _deleteBook);
  };

  let openForm = function () {
    modal.style.display = "block";
  };

  let closeForm = function (e) {
    if (
      e.target.classList.contains("modal") ||
      e.target.getAttribute("alt") === "close" ||
      e.target.getAttribute("id") === "addBtn"
    ) {
      modal.style.display = "none";
      reset.inputs();
    }
  };

  return { createCard, openForm, closeForm };
})();

addBtn.addEventListener("click", displayController.createCard);
addBtn.addEventListener("click", displayController.closeForm);
modalBtn.addEventListener("click", displayController.openForm);
closeBtn.addEventListener("click", displayController.closeForm);
modal.addEventListener("click", displayController.closeForm);
