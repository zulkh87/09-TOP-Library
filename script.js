let addBookBtn = document.querySelector("#add-new-book");

let myLibrary = [];

// Constructor Function
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};
// Constructor Function Ends

// checkbox toggle functionality
Book.prototype.toggleRead = function(){
    this.read = !this.read;
}

// calls toggleRead, renders the page
function toggleRead(index){
    myLibrary[index].toggleRead();
    showOnMarkUp();
}

// adds new book instance to HTML
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

// remove book functionality
function removeBook(index){
    myLibrary.splice(index, 1);
    showOnMarkUp();
}

// gets relevant values from HTML, initiates a Book instance, renders the page.
function addBookToLibrary() {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let pages = document.querySelector("#pages").value;
    let read = document.querySelector("#read").value;

    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    showOnMarkUp();
};

// Once clicked, makes form visible.
addBookBtn.addEventListener("click",function(){
    let formNewBook = document.querySelector("#form-new-book");
    formNewBook.style.display = "block";
});

// Prevents submit button to connect to database.
// once clicked, runs function
document.querySelector("#form-new-book").addEventListener("submit", function(event){
    event.preventDefault();
    addBookToLibrary();
});