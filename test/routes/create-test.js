const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/create', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('GET', () => {
    it('renders empty input fields', async () => {
      const response = await request(app).get('/items/create');

      const titleInput = jsdom(response.text).querySelector('input#title-input');
      const imageUrlInput = jsdom(response.text).querySelector('input#imageUrl-input');
      const descriptionTextarea = jsdom(response.text).querySelector('textarea#description-input');
      assert.equal(titleInput.value, '');
      assert.equal(imageUrlInput.value, '');
      assert.equal(descriptionTextarea.value, '');
    });
  });

  describe('POST', function () {
    it('creates a new item', async () => {
      const item = buildItemObject();
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(item);
      const createdItem = await Item.findOne(item);
      assert.isOk(createdItem, 'Item was not created in the database');
    });
    it('redirects to /', async () => {
      const item = buildItemObject();
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(item);
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });
    it('displays an error when the item title is invalid', async () => {
      const invalidItem = {description: 'fake description', imageUrl: 'https://fake.com'};
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(invalidItem);
      const createdItem = await Item.findOne(invalidItem);
      // assert.deepEqual(await Item.find({}), []);
      assert.isNotOk(createdItem, 'Invalid item should not have been created in the database');
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
    it('displays an error when the item description is invalid', async () => {
      const invalidItem = {title: 'fake title', imageUrl: 'https://fake.com'};
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(invalidItem);
      const createdItem = await Item.findOne(invalidItem);
      // assert.deepEqual(await Item.find({}), []);
      assert.isNotOk(createdItem, 'Invalid item should not have been created in the database');
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
    it('displays an error when the item imageUrl is invalid', async () => {
      const invalidItem = {title: 'fake title', description: 'fake description', imageUrl: 'fake image url'};
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(invalidItem);
      const createdItem = await Item.findOne(invalidItem);
      // assert.deepEqual(await Item.find({}), []);
      assert.isNotOk(createdItem, 'Invalid item should not have been created in the database');
      assert.equal(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'invalid');
    });
  });

});
