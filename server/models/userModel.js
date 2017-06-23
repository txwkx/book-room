const mongoose = require('mongoose'),
      Schema   = mongoose.Schema,
      bcrypt   = require('bcrypt');

const userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt((saltError, salt) => {
    if (saltError) return next(saltError);

    bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) return next(hashError);

      user.password = hash;
      next();

    });
  });

});

module.exports = mongoose.model('User', userSchema);
