'use strict';

var Priority = require('../models/priority');

exports.init = function(req, res){
  res.render('priorities/newPriority');
};

exports.create = function(req, res){
  var priority = new Priority(req.body);
  priority.save(function(){
    res.redirect('/priorities');
  });
  console.log(req.body);
};

exports.index = function(req, res){
  Priority.all(function(priorities){
    res.render('priorities/index', {priorities:priorities});
  });
};
