// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

module.exports = router;


var importDefault = (this && this.importDefault) || function(mod){
  return (mod && mod._esModule ? mod : {"default" : mod});
}

// define the book model
let myProperty = importDefault(require('../models/properties'));

/* GET books List page. READ */
router.get('/', (req, res, next) => {
// find all books in the books collection
myProperty.default.find((err, properties) => {
  if (err) {
    return console.error(err);
  }
  else {
    res.render('properties/index', {
      title: 'Properties',
      properties: properties
    });
  }
});

});

// GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  res.render('properties/details', {title: 'Add Property', page: 'propertiess', properties: ''});

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
let newProperty = new myProperty.default({
    "Name": req.body.name,
    "Price": req.body.price,
    "Location": req.body.location,
    "Description": req.body.description
});
myProperty.default.create(newProperty, (err) => {
    if (err) {
        console.error(err);
        res.end(err);
    }
    res.redirect('/');
});
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {
let id = req.params.id;
myProperty.default.findById(id, {}, {}, (err, propertyItemToEdit) => {
    if (err) {
        console.error(err);
        res.end(err);
    }
    res.render('properties/details', { title: 'Edit', page: 'properties', properties: propertyItemToEdit });
});
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
let id = req.params.id;
let editPropertyItem = new myProperty.default({
    "_id": id,
    "Name": req.body.name,
    "Price": req.body.price,
    "Location": req.body.location,
    "Description": req.body.description
});
myProperty.default.updateOne({ _id: id }, editPropertyItem, {}, (err) => {
    if (err) {
        console.error(err);
        res.end(err);
    }
    res.redirect('/');
});
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
let id = req.params.id;
myProperty.default.remove({ _id: id }, (err) => {
    if (err) {
        console.error(err);
        res.end(err);
    }
    res.redirect('/');
});
});

module.exports = router;