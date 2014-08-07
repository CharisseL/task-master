'use strict';

var Priority = require('../models/priority');
var Task = require('../models/task');

exports.init = function(req, res){
  Priority.all(function(priorities){
    res.render('tasks/init', {priorities:priorities});
  });
};

exports.create = function(req, res){
  var task = new Task(req.body);
  task.save(function(){
    res.redirect('/tasks');
  });
  console.log(req.body);
};

exports.index = function(req, res){
  Task.all(function(tasks){
    res.render('tasks/index', {tasks:tasks});
  });
};


