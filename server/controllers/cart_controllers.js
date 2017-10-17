const swag = require('../models/swag');

module.exports = {
  add: function (req, res, next) {
    const index = req.session.user.cart.findIndex(item => item.id === req.query.id);
    if (index === -1) {
      const selectedSwag = swag.find(item => item.id === +req.query.id);
      req.session.user.cart.push(selectedSwag);
      req.session.user.total += selectedSwag.price;
    }

    res.status(200).send(req.session.user);
  },

  delete: function (req, res, next) {
    const i = req.session.user.cart.findIndex(item => +req.query.id === item.id);
    const selectedSwag = swag.find(item => +req.query.id === item.id);
    if (i >= 0) {
      req.session.user.cart.splice(i, 1);
      req.session.user.total -= selectedSwag.price;
    }
    res.status(200).send(req.session.user);
  },

  checkout: function (req, res, next) {
    req.session.user = Object.assign(req.session.user, { username: '', total: 0, cart: [] } );
    res.status(200).send(req.session.user);
  },
}