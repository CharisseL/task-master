/* jshint expr:true*/
/* global describe, it, before, beforeEach*/

'use strict';
var expect = require('chai').expect;
var Priority = require('../../app/models/priority');

var p1, p2, p3;

describe('Priority', function(){
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
});



