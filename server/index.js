const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      session = require('express-session'),
      checkForSessions = require('./middlewares/checkForSession'),
      swagController = require('./controllers/swag_controller'),
      authController = require('./controllers/auth_controller'),
      cartController = require('./controllers/cart_controllers'),
      searchController = require('./controllers/search_controller');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: 'fjhadsifhasilffihasjdfasfasjf',
  resave: false,
  saveUninitialized: true
}));

app.use(checkForSessions);

// read from swag
app.get(`/api/swag`, swagController.read);

// user authentification
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signOut);
app.get('/api/user', authController.getUser);

// cart
app.post('/api/cart', cartController.add);
app.post('/api/cart/checkout', cartController.checkout);
app.delete('/api/cart', cartController.delete);

// serch
app.get('/api/search', searchController.search);

const PORT = 4200;
app.listen(PORT, () => console.log('Listening on port: ' + PORT));