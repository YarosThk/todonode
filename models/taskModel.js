const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
  item : String,
  status : String
});

const Task = mongoose.model('Task', tasksSchema);

module.exports = Task;
