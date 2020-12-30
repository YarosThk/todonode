const express = require('express');
const todoController = require(__dirname + '/controller/todoController');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use('/assets', express.static("public"));
app.use(express.urlencoded({extended: true}));
app.listen(3000);
todoController(app);
