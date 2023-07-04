// Book constructor
function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

// Ui constructor
function UI() {
  UI.prototype.addBooktoList = function (book) {
    const list = document.getElementById('book-list')
    // create element
    const row = document.createElement('tr')
    // Insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class='delete'>X</a> </td> `

    list.appendChild(row)
  }
}
// show alert
UI.prototype.showAlert = function (message, className) {
  const div = document.createElement('div')
  // add class
  div.className = `alert ${className} `
  // add text
  div.appendChild(document.createTextNode(message))
  //   get parent
  const container = document.querySelector('.container')
  const form = document.querySelector('#book-form')
  //   insert alert
  container.insertBefore(div, form)
  //   Timeout after 3s
  setTimeout(function () {
    document.querySelector('.alert').remove()
  }, 3000)
}

// clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''
}

UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove()
  }
}

// event listeners
document.getElementById('book-form').addEventListener('submit', function (e) {
  e.preventDefault()
  //   get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

  // instantiate book
  const book = new Book(title, author, isbn)

  // instantiate UI
  const ui = new UI()

  //   validate
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert(`please field all fields`, `error`)
  } else {
    ui.showAlert(`Book added successfully`, `success`)
    // add book to list
    ui.addBooktoList(book)
    //   clear fields
    ui.clearFields()
  }

})

// event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
  e.preventDefault()
  // instantiate ui
  const ui = new UI()
  ui.deleteBook(e.target)

  // show alert

  ui.showAlert(`Book removed! `, 'success')
})
