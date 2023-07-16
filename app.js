const router = require('express').Router();
const books = require('./books_dumb');

let booksDirectory = books;

router.get('/books', function (req, res) {
    res.send(booksDirectory);
});

router.get('/books/:id', function (req, res) {
    const { id } = req.params;

    const book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send('Book does not exist');

    res.send(book);
});

router.post('/books', function (req, res) {
    const {
        bookstitle,
        isbn,
       sellers,
       customers
    } = req.body;

    const bookExist = booksDirectory.find(b => b.isbn === isbn);
    if (bookExist) return res.send('Book already exist');

    const book = {
        bookstitle,
        isbn,
       sellers,
       customers
    };
    booksDirectory.push(book);

    res.send(book);
});

router.put('/books/:id', function (req, res) {
    const { id } = req.params;
    const {
        bookstitle,
        isbn,
       sellers,
       customers
    } = req.body;

    let book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send('Book does not exist');

    const updateField = (val, prev) => !val ? prev : val;

    const updatedBook = {
        ...book,
        bookstitle: updateField(bookstitle, book.bookstitle),
        isbn: updateField(isbn, book.isbn),
       sellers:updateField(sellers, book.sellers),
       customers:updateField(customers,book.customers)
    };

    const bookIndex = booksDirectory.findIndex(b => b.isbn === book.isbn);
    booksDirectory.splice(bookIndex, 1, updatedBook);

    res.status(200).send(updatedBook);
});

router.delete('/books/:id', function (req, res) {
    const { id } = req.params;

    let book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send('Book does not exist');

    booksDirectory = booksDirectory.filter(b => b.isbn !== id);

    res.send('Success');
});

module.exports = router;
