module.exports = function(db) {
	this.db = db;
};
module.exports.prototype = {
	collections : {},
	extend: function(properties) {
		var Child = module.exports;
		Child.prototype = module.exports.prototype;
		for(var key in properties) {
			Child.prototype[key] = properties[key];
		}
		return Child;
	},
	setDB: function(db) {
		this.db = db;
	},
	collection: function(collection) {
		if(this.collections.hasOwnProperty(collection)) return this.collections[collection];
		return this.collections[collection] = this.db.collection('fastdelivery-'+collection);
	}
}