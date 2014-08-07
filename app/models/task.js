'use strict';
var Priority = require('./priority');
var Mongo = require('mongodb');
var _ = require('lodash');
var async = require('async');

Object.defineProperty(Task, 'collection', {
  get: function(){return global.mongodb.collection('tasks');}
});

/********************
* CONSTRUCTOR       *
*********************/
function Task(t){
  this.name = t.name;
  this.due = new Date(t.due);
  this.photo = t.photo;
  this.isComplete = t.isComplete;
  this.tags = t.tags.split(',');
  this.priorityID = t.priorityID;
}

/********************
* SAVE              *
*********************/
Task.prototype.save = function(cb){
  Task.collection.save(this, cb);
};

/********************
 *  FIND BY ID      *
 ********************/

Task.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Task.collection.findOne({_id:_id}, function(err, obj){
    var task = changePrototype(obj);
    cb(task);
  });
};

/********************
* FIND ALL          *
*********************/
Task.all = function(cb){
  Task.collection.find().toArray(function(err, objects){
    var tasks = objects.map(function(o){
      return changePrototype(o);
    });
    async.map(tasks, function(task, cb4){   // async.map(tasks, fn, fn)
      Priority.findById(task.priorityID.toString(), function(priority){
        task.priority = priority;
        cb4(null, task);
      });
        },
        function(err, newTasks){
          cb(newTasks);
        });
  });
};



module.exports = Task;

function changePrototype(obj){
  return _.create(Task.prototype, obj);
}
