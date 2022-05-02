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

  static newBook() {
    this.title = document.querySelector("#title").value;
    this.author = document.querySelector("#author").value;
    this.pages = document.querySelector("#pages").value;
    this.read = document.querySelector('input[name="read"]').checked;

    let book = new Book(id, this.title, this.author, this.pages, this.read);
    id++;
    return book;
  }
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

// random

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(val) {
    this.speed = val * 1.6;
  }
}

class EV extends Car {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.#charge}`);
    return this;
  }
}

const tesla = new EV("Tesla", 40, 90);
const vw = new EV("Volkswagen", 60, 50);
console.log(tesla);
console.log(vw);

// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.brake();
// tesla.chargeBattery(100);
// console.log(tesla.charge);

// console.log(tesla.__proto__.constructor === Car);

// let car3 = new Car("Ford", 120);
// car3.accelerate();
// car3.brake();
// console.log(car3.speedUS);
// console.log((car3.speedUS = 20));
// console.log(car3.speed);

// let Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };

// let EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };

// EV.prototype.accelerate = function () {
//   this.speed += 20;
//   this.charge--;
//   console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}`);
// };

// EV.prototype.constructor = EV;
// const tesla = new EV("Tesla", 40, 90);
// console.log(tesla);

// tesla.accelerate();
// tesla.accelerate();
// tesla.accelerate();
// tesla.brake();
// tesla.chargeBattery(100);
// console.log(tesla.charge);

// console.log(tesla.__proto__.constructor === Car);

// let car1 = new Car("BMW", 120);
// let car2 = new Car("Mercedes", 95);

// car1.accelerate();
// car2.accelerate();
// car2.brake();

// console.log(Car.sound);
// console.log(car1.speedUS);

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2037 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// Student.prototype = Object.create(Person.prototype);
// const mike = new Student("Mike", 2020, "Computer Science");

// Student.prototype.introduce = function () {
//   console.log(`Hi, my name is ${this.firstName} and I study ${this.course}`);
// };

// mike.calcAge();

// class Account {
//   //Public fields(each instance gets its own)
//   locale = navigator.language;

//   //Privat fields
//   #movements = [];
//   #pin;

//   constructor(owner, currency, pin) {
//     this.owner = owner;
//     this.currency = currency;
//     this.#pin = pin;
//     // this.movements = [];
//     // this.locale = navigator.language;
//   }

//   sayHi() {
//     console.log("hi");
//   }

//   //Private methods
//   #approveLoan(val) {
//     return true;
//   }
// }

// const acc1 = new Account("Jonas", "Eur", 1111);
// const acc2 = new Account("Jay", "Eur", 2222);
// console.log(acc1);

// console.log(acc2);
// console.log(Account.prototype.owner);
