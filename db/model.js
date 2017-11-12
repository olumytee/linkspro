const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: String,
    meta: mongoose.Schema.Types.Mixed,
    apiKey: String,
    collections: [{ ref: 'Collections', type: mongoose.Schema.Types.ObjectId }]
  },
  { timestamps: true }
);

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

const Users = mongoose.model('Users', userSchema);

const collectionsSchema = mongoose.Schema(
  {
    collectionName: { type: String, unique: true },
    links: [{ ref: 'Links', type: mongoose.Schema.Types.ObjectId }],
    user: { ref: 'Users', type: String }
  },
  { timestamps: true }
);

const Collections = mongoose.model('Collections', collectionsSchema);

const linksSchema = mongoose.Schema(
  {
    url: { type: String },
    meta: mongoose.Schema.Types.Mixed,
    links_collection: { ref: 'Collections', type: String },
    user: { ref: 'Users', type: String },
    clickCount: Number
  },
  { timestamps: true }
);

const Links = mongoose.model('Links', linksSchema);

module.exports = {
  Users: Users,
  Collections: Collections,
  Links: Links
};
