'use strict';

var d3CloudTag = require('./lib/d3cloudtag');

hexo.extend.helper.register("d3cloudtag", function(tags, root){
  
	return d3CloudTag(tags, root);
	
});





