/* jshint expr:true*/
/* global describe, it, before, beforeEach*/
'use strict';
var expect = require('chai').expect;
var Mongo = require('mongodb');
var dbConnect = require('../../app/lib/mongodb');
var priority_helper = require('../../app/helpers/priority_helper');
var Task = require('../../app/models/task');
var Priority = require('../../app/models/priority');
var p1, p2, p3, t1, t2, t3;
var async = require('async');

describe('Task', function(){
  before(function(done){
    dbConnect('priority-test', function(){
      dbConnect('task-test', function(){
        done();
      });
    });
  });
  beforeEach(function(done){
    Task.collection.remove(function(){
      Priority.collection.remove(function(){

        var o1 = {name:'High', color:'Red', value:'10'};
        p1 = new Priority(o1);
        var o2 = {name:'Medium', color:'Green', value:'5'};
        p2 = new Priority(o2);
        var o3 = {name:'Low', color:'Fucshia', value:'1'};
        p3 = new Priority(o3);

        p1.save(function(){
          p2.save(function(){
            p3.save(function(){

              var o4 = {name:'get milk', due:'08/09/14', photo:'http://images.sodahead.com/polls/001366375/217521011_f92b51517f_xlarge.jpeg', tags:'groceries, home, milk', priorityID:p1._id};
              t1 = new Task(o4);
              var o5 = {name:'change oil', due:'08/05/14', photo:'http://arborautoworks.com/wp-content/uploads/2010/05/OilChange1.jpg', tags:'car, transportation, oil', priorityID:p2._id};
              t2 = new Task(o5);
              var o6 = {name:'get physical', due:'08/01/14', photo:'http://www.wendy-nielsen.com/wp-content/uploads/2012/08/lets-get-physical-button1.jpg', tags:'health, life, exercise', priorityID:p3._id};
              t3 = new Task(o6);

              t1.save(function(){
                t2.save(function(){
                  t3.save(function(){

                  done();
                  });
                });
              });
            });
          });
        });
      });
    });
  });
  describe('constructor', function(){
    it('should create a new Priority object', function(){

      expect(t1._id).to.be.instanceof(Mongo.ObjectID);
      expect(t1).to.be.instanceof(Task);
      expect(t1.name).to.equal('get milk');
      expect(t1.due).to.be.instanceof(Date);
      console.log(t1.due);
      expect(t1.tags.length).to.equal(3);
      expect(t1.priorityID).to.be.instanceof(Mongo.ObjectID);

      expect(t2._id).to.be.instanceof(Mongo.ObjectID);
      expect(t2).to.be.instanceof(Task);
      expect(t2.name).to.equal('change oil');
      expect(t2.due).to.be.instanceof(Date);
      console.log(t2.due);
      expect(t2.tags.length).to.equal(3);
      expect(t2.priorityID).to.be.instanceof(Mongo.ObjectID);

      expect(t3._id).to.be.instanceof(Mongo.ObjectID);
      expect(t3).to.be.instanceof(Task);
      expect(t3.name).to.equal('get physical');
      expect(t3.due).to.be.instanceof(Date);
      console.log(t3.due);
      expect(t3.tags.length).to.equal(3);
      expect(t3.priorityID).to.be.instanceof(Mongo.ObjectID);
    });
  });

  describe('.all', function(){
    it('should get all items from the database', function(done){
      Task.all(function(tasks){
              expect(tasks).to.have.length(3);
              expect(tasks[0]).to.respondTo('save');
              expect(tasks[0].priority).to.be.instanceof(Priority);
              expect(tasks[0].priority.name).to.equal('High');
              console.log(tasks);
              done();
      });
    });
  });

  describe('#addPriority', function(){
    it('should add a priority to a task', function(done){
      Priority.findById(t1.priorityID.toString(), function(priority){
        t1.priority = priority;
        expect(t1.priority).to.be.instanceof(Priority);
        done();
      });
    });
  });
});
