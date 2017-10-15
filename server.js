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
const mongourl = process.env.MONGODB_URI || 'mongodb://localhost/thegram';
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
const Accounts = require('./db/model').Accounts;
const Links = require('./db/model').Links;

const validate = require('./lib/validation').validate;
const userSchema = require('./lib/validation').userSchema;
const userUpdateSchema = require('./lib/validation').userUpdateSchema;
const accountSchema = require('./lib/validation').accountSchema;
const linkSchema = require('./lib/validation').linkSchema;
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
      'accounts'
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
      throw new Error();
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
    const update = await Users.findById(user._id).populate('accounts');
    res.json(update);
  } catch (error) {
    res.status(401).json({ error: 'Bad credentials' });
  }
});
////////////////////////////
//// Accounts CRUD /////////
////////////////////////////
app.post('/api/account', validate(accountSchema), async (req, res) => {
  try {
    const username = req.value.body.username;
    const newAccount = new Accounts({
      username: username,
      user: req.session.authUser._id
    });
    const account = await newAccount.save();
    const updateUser = await Users.findByIdAndUpdate(req.session.authUser._id, {
      $push: { accounts: account._id }
    });
    res.json(account.toObject());
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message || 'Error' });
  }
});

app.get('/api/account/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const account = await Accounts.findOne({ username: username });
    res.json(account.toObject());
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error' });
  }
});

app.delete('/api/account/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = req.session.authUser;
    const account = await Accounts.findOne({ username: username }).populate(
      'user'
    );

    if (user._id.toString() === account.user._id.toString()) {
      await Users.findByIdAndUpdate(user._id, {
        $pull: { accounts: account._id }
      });
      await Accounts.findByIdAndRemove(account._id);
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
app.post('/api/link', validate(linkSchema), async (req, res) => {
  try {
    const data = req.value.body;
    const account = await Accounts.findOne({ username: data.account });
    const user = req.session.authUser;
    const meta = await findMeta(data.url);
    const newLink = new Links({
      url: data.url,
      meta: meta,
      account: account._id,
      user: user._id
    });
    const link = await newLink.save();
    const updateAccount = await Accounts.findByIdAndUpdate(account._id, {
      $push: { links: link._id }
    });
    res.json(link.toObject());
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error' });
  }
});

app.put('/api/link/:id', validate(linkUpdateSchema), async (req, res) => {
  try {
    const id = req.params.id;
    const parameters = req.value.body;
    const account = await Links.findByIdAndUpdate(id, parameters);
    res.json(account.toObject());
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error' });
  }
});

app.delete('/api/link/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const link = await Links.findById(id)
      .populate('account')
      .populate('user');
    const user = req.session.authUser;
    if (user._id.toString() === link.user._id.toString()) {
      await Accounts.findByIdAndUpdate(link.account._id, {
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
    const account = await Accounts.findOne({ username: page });
    if (account) {
      const links = await Links.find({
        account: account._id
      })
        .sort('-createdAt')
        .limit(5);
      if (links.length > 0) {
        res.status(200).json(links);
      } else {
        res.sendStatus(200).json({ message: 'NoLinks' });
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    const message = error.message ? error.message : 'There was an error';
    res.status(401).send({ error: message });
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
