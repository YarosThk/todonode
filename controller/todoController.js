const fs = require('fs');
const request = require('http').request
const config = require('./../config')
const port = 3000;
const mongoose = require('mongoose');
const Task = require('./../models/taskModel')
const uri = 'mongodb+srv://' + config.dbUser + ':' + config.dbPass + '@mongopractice.mkpfv.mongodb.net/todoTasks?retryWrites=true&w=majority'
//to give coloring to connection messages in terminal
const chalk = require('chalk');
const connMade = chalk.bold.cyan;
const errorDuringConn = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const terminatedConn = chalk.bold.magenta;

//connect is asyncronous task, to it takes time, so can make a promise
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser : true })
  .catch((err) => console.log(err)); //this catches mongoose initial connection errors

mongoose.connection.on('connected', () => {
        console.log(connMade('Mongoose connected to DB Cluster'));
});
mongoose.connection.on('error', (error) => {
    console.error(errorDuringConn(error.message));
});
mongoose.connection.on('disconnected', () => {
    console.log(disconnected('Mongoose Disconnected'));
});
//when process is closed, like closing the server.
process.on('SIGNINT', () => {
  mongoose.connection.close(() => {
    console.log(terminatedConn('Mongoose connection closed on Application Timeout'));
    process.exit(0)
  });
});
module.exports = (app) => {
  app.get('/', (req, res) => {
    Task.find({}, (err, data) => {
      if (err) throw err;
      res.render('home', {todo : data});
    });
  });

  app.get('/home', (req, res) => {
    Task.find({}, (err, data) => {
      if (err) throw err;
      res.render('home', {todo : data});
    });
  });

  app.post('/home' ,(req, res) => {
    var newItem = {item : req.body.item,
      status : 'pending'};

    Task(newItem).save((err, data) => {
      if (err) throw err;
      res.json(data)
    })
  });

  app.post('/home/:item', (req, res) => {
    Task.find({item : req.params.item.replace(/\-/g, ' ')}, (err, data) => {
      if (err) throw err;
      if (data[0]['status'] === 'pending'){
        data[0]['status'] = 'completed';
        data[0].save()
        res.json(data);
      }else{
        data[0]['status'] = 'pending';
        data[0].save()
        res.json(data);
      };
    });
  });

  app.delete('/home/:item', (req, res) => {
    console.log(req.params.item)
    Task.deleteOne({item : req.params.item.replace(/\-/g, ' ')}, (err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

};
