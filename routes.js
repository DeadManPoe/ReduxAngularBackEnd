const express = require('express');
const booksController = require('./controllers/booksController');
const usersController = require('./controllers/usersContoller');

const router = express.Router();

router.get('/books', booksController.get);
router.post('/books', booksController.post);
router.put('/books/:book_id', booksController.put);
router.delete('/books/:book_id', booksController.delete);

router.post('/user', usersController.post);
router.post('/userauth', usersController.postAuthenticate);

router.all('*', (req, res)=> {
    res.status(404);
    res.end();
});


module.exports = router;