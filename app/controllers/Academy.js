var BaseController = require("./Base"),
	View = require("../views/Base"),
	Content = require('../models/Content');

module.exports = BaseController.extend({ 
	name: "Academy",
	content: null,
	run: function(req, res, next) {
		var self = this;
		this.getContent(function() {
			var v = new View(res, 'academy');
			v.render(self.content);
		});
	},
	getContent: function(callback) {
		var self = this;
		this.content = {};
		var contentList = '';
		Content.find({type:'academy'}, function(err, contents) {
    		contents.forEach(function(content) {
      			contentList += '\
					<section class="item">\
	                    <h2>' + content.title + '</h2>\
	                    <p>' + content.text + '</p>\
	                    <br class="clear" />\
						<hr />\
	                </section>\
						';
    		});
    		self.content.contentList = contentList;
			callback();

    	});
	}
});