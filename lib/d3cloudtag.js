'use strict';

var Canvas = require("canvas");
var cloud = require("d3-cloud");
var d3 = require("d3");

var layout = cloud()
    .size([600, 400])
    .canvas(function() { return new Canvas(1, 1); })
    .padding(7)
    .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .font("Impact")
    .fontSize(function(d) { return d.size; });

//D3 5.* version do not have this
//var fill = d3.scale.category20();

var fill = d3.scaleOrdinal(d3.schemeBlues[9]);

function d3CloudTag(tags, root){

  if (!tags || !tags.length) return '';

  var result = [];

  tags = tags.sort('name', 1);

  tags = tags.filter(function(tag){
    return tag.length;
  });

  var maxsize = 1;

  tags.sort('length').forEach(function(tag){
    var length = tag.length;
    if(length > maxsize)
        maxsize = length;
  });


  var arr = [],words;
  tags.forEach(function(tag){
     arr.push({"name": tag.name,"num" : tag.length, "path":tag.path});
  });
  words = arr.map(function(d) {
      var text = d.name.replace(/[^\x00-\xff]/g,"ab");
      return {name:d.name, text: text, size : Math.log(d.num)/(Math.log(maxsize)-Math.log(1)) * 15 + 30, path:d.path};
  });
  layout.words(words);
  layout.start();

  result.push('<svg width="600" height="400"><g transform="translate(300,200)">');
  words.forEach(function(word,i){

    result.push(
      '<a href="' + root + word.path + '" >' +
        '<text text-anchor="middle" fill="'+fill(i)+'" transform="translate('+word.x+','+word.y+')rotate('+
        word.rotate+')" style="font-size:'+word.size+'px;font-family:Impact">'+
        word.name+
        '</text>' +
      '</a>'
    );
  });
  result.push('</g></svg>');

  return result.join('');

}

module.exports = d3CloudTag;
