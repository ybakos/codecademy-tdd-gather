const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

router.get('/items/create', (req, res, next) => {
  res.render('items/create');
});

router.post('/items/create', async (req, res, next) => {
  const {title, description, imageUrl} = req.body;
  const item = new Item({title, description, imageUrl});
  item.validateSync();
  if (item.errors) {
    res.status(400).render('items/create', {newItem: item});
  } else {
    await item.save();
    res.redirect('/');
  }
});

module.exports = router;
