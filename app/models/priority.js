'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');

Object.defineProperty(Priority, 'collection', {
  get: function(){return global.mongodb.collection('priorities');}
});

/********************
* CONSTRUCTOR       *
*********************/
function Priority(p){
  this.name = p.name;
  this.color = p.color;
  this.value = p.value * 1;
}

/********************
* SAVE              *
*********************/
Priority.prototype.save = function(cb){
  Priority.collection.save(this, cb);
};

/********************
* FIND ALL          *
*********************/
Priority.all = function(cb){
  Priority.collection.find().toArray(function(err, objects){
    var priorities = objects.map(function(p){
      return changePrototype(p);
    });
    cb(priorities);
  });
};

module.exports = Priority;

/********************
* CHANGE PROTOTYPE  *
*********************/
function changePrototype(obj){
  var priority = _.create(Priority.prototype, obj);
  return priority;
}

