const unfinishedBooks = document.getElementById("unfinished-books");
const finishedBooks = document.getElementById("finished-books");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const yearInput = document.getElementById("year");


let books = JSON.parse(localStorage.getItem("books")) || [];

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function renderBooks() {
  unfinishedBooks.innerHTML = "";
  finishedBooks.innerHTML = "";

  books.forEach((book) => {
    const li = document.createElement("li");
    const moveButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    li.innerText = `${book.title} - ${book.author} (${book.year})`;
    moveButton.innerText = book.isComplete ? "Pindahkan ke Belum Selesai" : "Pindahkan ke Selesai";
    deleteButton.innerText = "Hapus";

    moveButton.addEventListener("click", () => {
      book.isComplete = !book.isComplete;
      saveBooks();
      renderBooks();
    });

    deleteButton.addEventListener("click", () => {
      const bookIndex = books.indexOf(book);
      if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        saveBooks();
        renderBooks();
      }
    });

    li.appendChild(moveButton);
    li.appendChild(deleteButton);

    if (book.isComplete) {
      finishedBooks.appendChild(li);
    } else {
      unfinishedBooks.appendChild(li);
    }
  });
}

function addBook() {
  const title = titleInput.value;
  const author = authorInput.value;
  const year = parseInt(yearInput.value);
  const id = +new Date(); 

  if (title && author && !isNaN(year)) {
    const newBook = {
      id,
      title,
      author,
      year,
      isComplete: false,
    };

    books.push(newBook);
    saveBooks();
    renderBooks();

    titleInput.value = "";
    authorInput.value = "";
    yearInput.value = "";
  }
}

renderBooks();