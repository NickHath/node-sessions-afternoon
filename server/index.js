const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      session = require('express-session'),
      checkForSessions = require('./middlewares/checkForSession');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: 'fjhadsifhasilffihasjdfasfasjf',
  resave: false,
  saveUninitialized: true
}));

app.use(checkForSessions);

const PORT = 4200;
app.listen(PORT, () => console.log('Listening on port: ' + PORT));