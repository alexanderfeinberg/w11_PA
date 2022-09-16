require('express-async-errors');
require('dotenv').config();
const {WarehouseItem, sequelize} = require('./db/models') //importing models
const express = require('express');
const app = express();

app.use(express.json());

app.get("/items", async (req, res) => {

  const items = await WarehouseItem.findAll({
    where: {
      isUsed: false
    }
  })

  res.json(items)
})

app.get("/items/:name", async (req,res) => {

  const item = await WarehouseItem.findOne({
    where: {
      name: req.params.name
    }
  })

  if (!item) {
    res.statusCode = 404
    res.json({"message": "Warehouse Item not found"})
  }

  res.json(item)
})





if (require.main === module) {
  const port = 8003;
  app.listen(port, () => console.log('Server-3 is listening on port', port));
} else {
  module.exports = app;
}
