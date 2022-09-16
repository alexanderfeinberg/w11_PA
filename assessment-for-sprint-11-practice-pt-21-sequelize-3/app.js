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


app.put('/items/:id', async(req, res, next)=>{
  // const {name, price, quantity, isUsed} = req.body;
  const item  = await WarehouseItem.findByPk(req.params.id)

  if(!item){
    res.status(404)
    return res.json({"message": "Warehouse Item not found"})
  }

  for(let key of Object.keys(req.body)){
    item[key] = req.body[key]
  }

  await item.save()
  res.json(item)

})

app.delete('/items/:id', async(req, res, next)=>{
  const item = await WarehouseItem.findByPk(req.params.id);
  console.log(item)

  if(!item){
    res.status(404)
    return res.json({
      "message": "Warehouse Item not found"
    })
  }
  await item.destroy();

  res.json({
    "message": "Successfully deleted"
  })
})






if (require.main === module) {
  const port = 8003;
  app.listen(port, () => console.log('Server-3 is listening on port', port));
} else {
  module.exports = app;
}
