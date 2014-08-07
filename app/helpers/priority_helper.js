'use strict';
var Priority = require('../models/priority');
//var Task = require('../models/task');
//var dbConnect = require('../lib/mongodb');


function AddP(task, cb){

  Priority.findById(task.priorityID.toString(), function(priority){
    task.priority = priority;
  });

  cb(task);
};

module.exports = AddP;
