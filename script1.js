"use strict";

let myLibrary = [];
let addBtn = document.querySelector("#addBtn");
let modalBtn = document.querySelector(".modalBtn");
let closeBtn = document.querySelector(".closeBtn");
let modal = document.querySelector(".modal");
let booksContainer = document.querySelector(".books-container");
let bookTitle, bookAuthor, bookPages, bookRead;
let id = 0;

function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

let getBookDetails = function () {
  bookTitle = document.querySelector("#title").value;
  bookAuthor = document.querySelector("#author").value;
  bookPages = document.querySelector("#pages").value;
  bookRead = document.querySelector('input[name="read"]').checked;

  let book = new Book(id, bookTitle, bookAuthor, bookPages, bookRead);

  id++;
  return book;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

let reset = function () {
  bookTitle = "";
  bookAuthor = "";
  bookPages = "";
  bookRead = document.querySelector('input[name="read"]').checked = false;

  document.querySelector("#title").value = "";
  document.querySelector("#author").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector('input[name="read"]').checked = false;
};

/* creates new book object, pushes it into library array and displays card in dom */
/* way too big function */
function displayBook() {
  let book = getBookDetails();
  addBookToLibrary(book);

  let card = document.createElement("div");
  let header = document.createElement("h2");
  let author = document.createElement("p");
  let pages = document.createElement("p");
  let read = document.createElement("p");
  let deleteBtn = document.createElement("button");
  let statusBtn = document.createElement("button");

  let toggleStatus = function (e) {
    let id = e.target.getAttribute("data-id");

    myLibrary.forEach((book) => {
      if (book.id === Number(id)) {
        book.read === false ? (book.read = true) : (book.read = false);
      }
    });

    read.textContent = `Have read it:  ${book.read === true ? "Yes" : "No"}`;
  };

  let deleteCard = function (e) {
    let id = e.target.getAttribute("data-id");
    let card = document.querySelector(`div[data-id="${id}"]`);
    card.remove();

    myLibrary.forEach((book) => {
      if (book.id === Number(id)) {
        myLibrary.splice(myLibrary.indexOf(book), 1);
      }
    });
  };

  deleteBtn.textContent = "Delete";
  statusBtn.textContent = "Status";
  deleteBtn.setAttribute("data-id", book.id);
  statusBtn.setAttribute("data-id", book.id);
  card.setAttribute("data-id", book.id);

  header.textContent = `${book.title}`;
  author.textContent = `By ${book.author}`;
  pages.textContent = `Pages: ${book.pages}`;
  read.textContent = `Have read it:  ${book.read === true ? "Yes" : "No"}`;

  card.classList.add("card");
  deleteBtn.classList.add("btn");
  statusBtn.classList.add("btn");

  card.appendChild(header);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);

  card.appendChild(statusBtn);
  card.appendChild(deleteBtn);

  booksContainer.appendChild(card);
  statusBtn.addEventListener("click", toggleStatus);
  deleteBtn.addEventListener("click", deleteCard);
  console.log(myLibrary);
}

/* open modal and close modal by clicking on close button or overlay */
let openModal = function () {
  modal.style.display = "block";
};

let closeModal = function (e) {
  if (
    e.target.classList.contains("modal") ||
    e.target.getAttribute("alt") === "close" ||
    e.target.getAttribute("id") === "addBtn"
  ) {
    modal.style.display = "none";
    reset();
  }
};

// addBtn.addEventListener("click", addBookToLibrary);
addBtn.addEventListener("click", displayBook);
addBtn.addEventListener("click", closeModal);
modalBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", closeModal);
