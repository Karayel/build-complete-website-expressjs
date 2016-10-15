var Model = require("./Base"),
    crypto = require("crypto"),
    model = new Model();
var UserModel = model.extend({
    insert: function(data, callback) {
        data.ID = crypto.randomBytes(20).toString('hex');
        this.collection('user').insert(data, {}, callback || function(){ });
    },
    update: function(data, callback) {
        this.collection('user').update({ID: data.ID}, data, {}, callback || function(){ });
    },
    getlist: function(callback, query) {
        this.collection('user').find(query || {}).toArray(callback);
    },
    remove: function(ID, callback) {
        this.collection('user').findAndModify({ID: ID}, [], {}, {remove: true}, callback);
    }
});
module.exports = UserModel;