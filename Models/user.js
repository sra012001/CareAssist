/**
 * Created by rizwansyed on 2016-08-17.
 */

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var userSchema = mongoose.Schema({
   local: {
       userName: String,
       password: String

   }
});
//console.log('invoked');
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.validPassword = function (password,enteredpwd) {
    return bcrypt.compareSync(enteredpwd, password);
}
module.exports = mongoose.model('User', userSchema);