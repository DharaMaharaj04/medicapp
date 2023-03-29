const router = require('express').Router();
let Inventory = require('../models/inventories.model');
const mongoose = require('mongoose');
router.route('/').get((req, res) => {
  Inventory.find()
    .then(inventories => res.json(inventories))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/').post((req, res) => {
    const { item,
            category,
            brands,
            vendor,
            quantity,
            currentstock,
            shelf
          } = req.body;

          const newInventory = new Inventory({ 
            item,
            category,
            brands,
            vendor,
            quantity,
            currentstock,
            shelf
           })

newInventory.save()
.then(() => res.json(newInvntory))
.catch(err => res.status(400).json('Error: ' + err));
});      


router.route('/:id').delete((req, res) => {
    Inventory.findByIdAndDelete(req.params.id)
      .then(() => res.json('Inventory deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').get((req, res) => {
    Inentory.findById(req.params.id)
      .then(inventory => res.json(inventories))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').patch((req, res) => {
    Inventory.findById(req.params.id)
      .then(inventories => {
        inventories.id = req.body.id;
        inventories.item = req.body.item;
        inventories.category = req.body.category;
        inventories.brands = req.body.brands;
        inventories.vendor = req.body.vendor;
        inventories.quantity = req.body.quantity;
        inventories.currentstock = req.body.currentstock;
        inventories.shelf = req.body.shelf;
        inventories.save()
          .then(() => res.json(inventories))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  module.exports = router;