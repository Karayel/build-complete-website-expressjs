var Model = require("./Base"),
	crypto = require("crypto"),
	model = new Model();
var ContentModel = model.extend({
	insert: function(data, callback) {
		data.ID = crypto.randomBytes(20).toString('hex'); 
		this.collection('content').insert(data, {}, callback || function(){ });
	},
	update: function(data, callback) {
		this.collection('content').update({ID: data.ID}, data, {}, callback || function(){ });
	},
	getlist: function(callback, query) {
		this.collection('content').find(query || {}).toArray(callback);
	},
	remove: function(ID, callback) {
		this.collection('content').findAndModify({ID: ID}, [], {}, {remove: true}, callback);
	}
});
module.exports = ContentModel;