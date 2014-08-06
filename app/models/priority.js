'use strict';

function Priority(p){
  this.name = p.name;
  this.color = p.color;
  this.value = parseInt(p.value);
}

module.exports = Priority;
