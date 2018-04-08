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

router.get('/items/:id', async (req, res, next) => {
  const id = req.params.id;
  const item = await Item.findById(id);
  if (item) {
    res.render('items/item', {item: item});
  } else {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
})

router.post('/items/:id/delete', async (req, res, next) => {
  const id = req.params.id;
  await Item.remove({_id: id});
  res.redirect('/');
})

module.exports = router;
