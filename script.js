document.addEventListener("DOMContentLoaded", () => {
  console.log("hahahahah");
  const div_books = document.querySelector(".books");
  const submit_btn = document.querySelector("#submit-btn");

  const myLibrary = [
    {
      author: "chinua achebe",
      title: "things fall apart",
      pages: 504,
      read: false,
    },
    {
      author: "henry miller",
      title: "tropic of cancer",
      pages: "200",
      read: true,
    },
    {
      author: "charles bukowski",
      title: "ham on rye",
      pages: "320",
      read: true,
    },
  ];

  display(myLibrary);

  function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }

  function addBookToLibrary(obj) {
    myLibrary.push(obj);
  }

  function display(books_arr) {
    while (div_books.firstChild) {
      div_books.removeChild(div_books.lastChild);
    }
    books_arr.forEach((obj, i) => {
      div_books.insertAdjacentHTML(
        "beforeend",

        `
          <input type="hidden" data-id="${i}"/>
          <div class="card">
          <p>${obj.author}</p>
          <p>${obj.title}</p>
          <p>${obj.pages}</p>
          <p class="read">${obj.read ? "read" : "not read"}</p>
        </div>`
      );
    });

    Array.from(div_books.querySelectorAll(".card")).forEach((card, i) => {
      const button = document.createElement("button");
      button.innerText = "remove";
      button.setAttribute("data-book-index", i); // Store title

      const change_read = document.createElement("button");
      change_read.innerText = "Change read status";
      change_read.setAttribute("data-book-index", i); // Store title

      change_read.addEventListener("click", (e) => {
        const index = change_read.getAttribute("data-book-index");
        console.log(myLibrary[index].read);
        /*         const new_obj_arr = myLibrary;
         */

        myLibrary[index].read = !myLibrary[index].read;
        display(myLibrary);
      });

      button.addEventListener("click", () => {
        const index = button.getAttribute("data-book-index");

        const new_library_arr = myLibrary.splice(index, 1);
        console.log(new_library_arr);
        display(myLibrary);
      });

      card.append(change_read);
      card.append(button);
    });

    for (input of document.querySelectorAll("input")) {
      if (input.type != "submit") {
        input.value = "";
      }
    }
  }

  submit_btn.addEventListener("click", (e) => {
    e.preventDefault();
    const form = document.querySelector("form");
    console.log(form);
    const form_data = new FormData(form);

    const new_book = new Book();

    for (const [key, value] of form_data.entries()) {
      if (!value) {
        new_book[key] = false;
      } else {
        new_book[key] = value;
      }
    }
    addBookToLibrary(new_book);
    console.log("book added to library!");
    console.log(myLibrary);
    display(myLibrary);
  });
});
