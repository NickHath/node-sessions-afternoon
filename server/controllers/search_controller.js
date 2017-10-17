const swag = require('../models/swag');

module.exports = {
  search: function(req, res, next) {
    const { category } = req.query;
    if (category) {
      const filteredSwag = swag.filter(item => item.category === category);
      res.status(200).send(filteredSwag);
    } else {
      res.status(200).send(swag);
    }
  }
}