const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('../db/mongoose');
const {ObjectId} = require('mongodb');
const {TodoModel} = require('../models/Todo');
const {UserModel} = require('../models/User');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new TodoModel({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  TodoModel.find().then((todos) => {
    res.send({
      todos
    })
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectId.isValid(id)) res.status(404).send({message: "Id invalid"});
  TodoModel.findById(id).then((todo) => {
    if(!todo) res.status(404).send({message: "Record not found"});
    res.send({todo});
  }, (e) => {
    res.status(400).send(e);
  })
});

var port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Started on port', port);
})
