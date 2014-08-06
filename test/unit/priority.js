/* jshint expr:true*/
/* global describe, it, before, beforeEach*/

'use strict';
var expect = require('chai').expect;
var Priority = require('../../app/models/priority');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');

var p1, p2, p3;

describe('Priority', function(){
  before(function(done){
    dbConnect('priority-test', function(){
      done();
    });
  });
  beforeEach(function(done){
    Priority.collection.remove(function(){
      done();
    });
  });
  describe('constructor', function(){
    it('should create a new Priority object', function(){
      p1 = {name:'High', color:'Red', value:'10'};
      p2 = new Priority(p1);

      expect(p2).to.be.instanceof(Priority);
      expect(p2.name).to.equal('High');
      expect(p2.color).to.equal('Red');
      expect(p2.value).to.equal(10);
    });
  });
  describe('#save', function(){
    it('should save to db', function(done){
      p1 = {name:'High', color:'Red', value:'10'};
      p2 = new Priority(p1);
      p2.save(function(){
        expect(p2._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });
  describe('.all', function(){
    it('should get all items from the database', function(done){
      var o1 = {name:'High', color:'Red', value:'10'};
      p1 = new Priority(o1);
      var o2 = {name:'Medium', color:'Green', value:'5'};
      p2 = new Priority(o2);
      var o3 = {name:'Low', color:'Fucshia', value:'1'};
      p3 = new Priority(o3);
      p1.save(function(){
        p2.save(function(){
          p3.save(function(){
            Priority.all(function(priorities){
              expect(priorities).to.have.length(3);
              expect(priorities[0]).to.respondTo('save');
              done();
            });
          });
        });
      });
    });
  });
});



