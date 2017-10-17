const users = require('../models/users');
let id = 1;

module.exports = {
  login: function(req, res, next) {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      req.session.user.username = user.username;
      res.status(200).send(req.session.user);
    } else {
      res.status(500).send('Unauthorized');
    }
  },

  register: function(req, res, next) {
    const { username, password } = req.body;
    
    users.push( { username, password, id } );
    id++;

    req.session.user.username = username;
    res.status(200).send(req.session.user);
  },

  signOut: function(req, res, next) {
    req.session.destroy();
    res.status(200).send(req.session);
  },

  getUser: function(req, res, next) {
    res.status(200).send(req.session.user);
  }
}