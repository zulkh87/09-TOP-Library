// Selections from HTML
let addBookBtn = document.querySelector("#add-new-book");
// Selections from HTML End

let myLibrary = [];

// Constructor Function
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};
// Constructor Function Ends

Book.prototype.toggleRead = function(){
    this.read = !this.read;
}

function toggleRead(index){
    myLibrary[index].toggleRead();
    showOnMarkUp();
}

function showOnMarkUp(){
    let libraryElement = document.querySelector("#library");
    libraryElement.innerHTML = "";
    for(let i = 0; i < myLibrary.length; i++){
        let book = myLibrary[i];
        let bookElement = document.createElement("div");
        bookElement.setAttribute("class","book-card");
        bookElement.innerHTML = `
        <div class="card-header">
            <h3 class="title">${book.title}</h3>
            <h5 class="author">${book.author}</h5>
        </div>
        <div class="card-body">
            <p>${book.pages} pages</p>
            <p class="read-status">${book.read ? "read" : "not read yet"}</p>
            <button class="remove-btn" onclick="removeBook(${i})">Remove</button>
            <button class="toggle-read-btn" onclick="toggleRead(${i})">Toggle Read Status</button>
        </div>
        `;
        libraryElement.appendChild(bookElement);
    }
}

function removeBook(index){
    myLibrary.splice(index, 1);
    showOnMarkUp();
}

function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").value;

    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    showOnMarkUp();
};

addBookBtn.addEventListener("click",function(){
    let formNewBook = document.querySelector("#form-new-book");
    formNewBook.style.display = "block";
});

document.querySelector("#form-new-book").addEventListener("submit", function(event){
    event.preventDefault();
    addBookToLibrary();
});