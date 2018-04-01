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
  await Item.create(req.body);
  const items = await Item.find({});
  res.render('index', {items});
});

module.exports = router;
