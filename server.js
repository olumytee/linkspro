const { Nuxt, Builder } = require('nuxt');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const app = require('express')();
const axios = require('axios');
const _ = require('lodash');
const mongoose = require('mongoose');
global.Promise = require('q').Promise;
const mongourl = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : 'mongodb://localhost/thegram';
mongoose.connect(mongourl, {
  useMongoClient: true,
  promiseLibrary: global.Promise
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  // we're connected!
  console.log('db connected');
});

const Users = require('./db/model').Users;
const Collections = require('./db/model').Collections;
const Links = require('./db/model').Links;

const validate = require('./lib/validation').validate;
const userSchema = require('./lib/validation').userSchema;
const userUpdateSchema = require('./lib/validation').userUpdateSchema;
const collectionSchema = require('./lib/validation').collectionSchema;
const linkSchema = require('./lib/validation').linkSchema;
const linkSchemameta = require('./lib/validation').linkSchemameta;
const linkUpdateSchema = require('./lib/validation').linkUpdateSchema;
const findMeta = require('./lib/metafinder').findMeta;
// Body parser, to access req.body
app.use(bodyParser.json());

// Sessions to create req.session
app.use(
  session({
    secret: 'super-xxxxx-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 24 * 30 },
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// POST /api/register to register user and add req.session.authuser
app.post('/api/register', validate(userSchema), async (req, res) => {
  try {
    const parameters = req.value.body;
    const newUser = new Users(parameters);
    const user = await newUser.save();
    user.password = undefined;
    req.session.authUser = user;
    res.json(user.toObject());
  } catch (error) {
    res.status(401).json({ error: 'Bad credentials' });
  }
});

// POST /api/login to log in the user and add him to the req.session.authUser
app.post('/api/login', validate(userSchema), async (req, res) => {
  try {
    const parameters = req.value.body;
    const user = await Users.findOne({ email: parameters.email }).populate(
      'collections'
    );
    if (user) {
      bcrypt.compare(parameters.password, user.password, (err, result) => {
        // res === true
        if (err) {
          res.status(401).json({ error: 'Bad credentials' });
        } else {
          if (result) {
            user.password = undefined;
            req.session.authUser = user;
            res.json(user.toObject());
          } else {
            res.status(401).json({ error: 'Bad credentials' });
          }
        }
      });
    } else {
      throw new Error('User does not exist');
    }
  } catch (error) {
    res.status(401).json({ error: 'Bad credentials' });
  }
});
// GET /api/logout to log out the user and remove it from the req.session
app.get('/api/logout', function(req, res) {
  delete req.session.authUser;
  res.json({ ok: true });
});
// update user
app.put('/api/user', validate(userUpdateSchema), async (req, res) => {
  try {
    const user = req.session.authUser;
    const parameters = req.value.body;
    const update = await Users.findByIdAndUpdate(user._id, parameters);
    res.sendStatus(200);
  } catch (error) {
    res.status(401).json({ error: 'Bad credentials' });
  }
});

////////////////////////////
//// da /////////
////////////////////////////
app.get('/api/dashboard', async (req, res) => {
  try {
    const user = req.session.authUser;
    const update = await Users.findById(user._id).populate('collections');
    res.json(update);
  } catch (error) {
    res.status(401).json({ error: 'Bad credentials' });
  }
});
////////////////////////////
//// Collections CRUD /////////
////////////////////////////
app.post('/api/collection', validate(collectionSchema), async (req, res) => {
  try {
    const username = req.value.body.username;
    const newCollection = new Collections({
      username: username,
      user: req.session.authUser._id
    });
    const collection = await newCollection.save();
    const updateUser = await Users.findByIdAndUpdate(req.session.authUser._id, {
      $push: { collections: collection._id }
    });
    res.json(collection.toObject());
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message || 'Error' });
  }
});

app.get('/api/collection/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const collection = await Collections.findOne({ username: username });
    res.json(collection.toObject());
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error' });
  }
});

app.delete('/api/collection/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = req.session.authUser;
    const collection = await Collections.findOne({
      username: username
    }).populate('user');

    if (user._id.toString() === collection.user._id.toString()) {
      await Users.findByIdAndUpdate(user._id, {
        $pull: { collections: collection._id }
      });
      await Collections.findByIdAndRemove(collection._id);
      res.sendStatus(200);
    } else {
      throw Error('Unauthorized');
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message || 'Error' });
  }
});

////////////////////////////
//// Links CRUD /////////
////////////////////////////
app.post('/api/initlink', validate(linkSchema), async (req, res) => {
  try {
    const data = req.value.body;
    const meta = await findMeta(data.url);
    res.json({
      title: meta.title || '',
      image: meta.image.url,
      description: meta.description
    });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error' });
  }
});
app.post('/api/link', validate(linkSchemameta), async (req, res) => {
  try {
    const data = req.value.body;
    const collection = await Collections.findOne({ username: data.collection });
    const user = req.session.authUser;
    const newLink = new Links({
      url: data.url,
      meta: data.meta,
      links_collection: collection._id,
      user: user._id
    });
    const link = await newLink.save();
    const updateCollection = await Collections.findByIdAndUpdate(
      collection._id,
      {
        $push: { links: link._id }
      }
    );
    res.json(link.toObject());
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error' });
  }
});

app.put('/api/link/:id', validate(linkUpdateSchema), async (req, res) => {
  try {
    const id = req.params.id;
    const parameters = req.value.body;
    const collection = await Links.findByIdAndUpdate(id, parameters);
    res.json(collection.toObject());
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error' });
  }
});

app.delete('/api/link/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const link = await Links.findById(id)
      .populate('links_collection')
      .populate('user');
    const user = req.session.authUser;
    if (user._id.toString() === link.user._id.toString()) {
      await Collections.findByIdAndUpdate(link.links_collection._id, {
        $pull: { links: link._id }
      });
      await Links.findByIdAndRemove(link._id);
      res.sendStatus(200);
    } else {
      throw Error('Unauthorized');
    }
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error' });
  }
});
// public link
app.get('/api/u/:page', async (req, res) => {
  try {
    const page = req.params.page;
    const collection = await Collections.findOne({ username: page });
    if (collection) {
      const links = await Links.find({
        links_collection: collection._id
      })
        .sort('-createdAt')
        .limit(5);
      if (links.length > 0) {
        res.status(200).json(links);
      } else {
        res.redirect('/404');
      }
    } else {
      res.redirect('/404');
    }
  } catch (error) {
    const message = error.message ? error.message : 'There was an error';
    res.redirect('/404');
  }
});

// app.get('*', async (req, res) => {
//   res.redirect('/');
// });
let config = require('./nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

// Init Nuxt.js
const nuxt = new Nuxt(config);

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt);
  builder.build();
}

app.use(nuxt.render);
app.listen(process.env.PORT || 3000);
console.log('Server is listening on http://localhost:3000');
