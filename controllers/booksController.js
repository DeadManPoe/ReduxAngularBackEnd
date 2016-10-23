const bookModel = require('../models/book');

class BooksController{
    constructor(){}

    static get(req, res) {
        bookModel.find((err,bears)=>{
            if(err){
                res.send(err);
            }
            res.json(bears);
        })
    }
    static post(req,res) {
        let book = new bookModel();
        for(let key in req.body){
            if(req.body.hasOwnProperty(key)){
                book[key] = req.body[key];
            }
        }
        book.save((err)=>{
            if(err){
                res.end(err)
            }
            res.json({message : 'Book created'})
        })
    }
    static put(req,res){
        bookModel.findById(req.params.book_id,(err,book)=>{
            if(err){
                res.end(err);
            }
            for(let key in req.body){
                if(req.body.hasOwnProperty(key)){
                    book[key] = req.body[key];
                }
            }
            book.save((err)=>{
                if(err){
                    res.end(err)
                }
                res.json({message : 'Book updated'})
            })

        })
    }
    static delete(req,res){
        bookModel.findById(req.params.book_id,(err,book)=>{
            if(err){
                res.end(err);
            }
            book.delete((err)=>{
                if(err){
                    res.end(err);
                }
                res.json({message : 'Book deleted'})
            })
        })
    }
}
module.exports = BooksController;