// controllers/bookController.js
const Book = require('../models/Book');

// Create a new book
exports.createBook = async (req, res) => {
    try {
      const { title, author, description, publishedYear } = req.body;

      const book = await Book.create({
        title,
        author,
        description,
        publishedYear,
        userId: req.user.userId 
      });
  
      res.status(201).json(book);
    } catch (error) {
      console.error('Error creating book:', error); // Add this
      res.status(500).json({ error: 'Failed to create book' });
    }
  };
  


// Get all books
exports.getAllBooks = async (req, res) => {
    try {
      const books = await Book.findAll({
        where: { userId: req.user.userId }, // only their books
      });
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch books' });
    }
  };
  

// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch book', details: err.message });
  }
};

// Update book
exports.updateBook = async (req, res) => {
    try {
      const book = await Book.findOne({ where: { id: req.params.id, userId: req.user.userId } });
      if (!book) return res.status(404).json({ error: 'Book not found' });
      if (book.userId !== req.user.userId) {
        return res.status(403).json({ error: 'Unauthorized to update this book' });
      }
      await book.update(req.body);
      res.json(book);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update book' });
    }
  };
// Delete book
exports.deleteBook = async (req, res) => { // Ensure this is exported
    try {
      const book = await Book.findByPk(req.params.id);
  
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
  
      // Check if the book belongs to the current user
      if (book.userId !== req.user.userId) {
        return res.status(403).json({ error: 'Unauthorized to delete this book' });
      }
  
      await book.destroy();
      res.status(200).json({ message: 'Book deleted successfully' });
  
    } catch (error) {
      console.error('Delete Book Error:', error);
      res.status(500).json({ error: 'Failed to delete book' });
    }
  };

