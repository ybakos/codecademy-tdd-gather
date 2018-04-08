const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id/delete', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  describe('POST', () => {
    it('deletes the item', async () => {
      const title = "Fake Item";
      const description = "Fake description";
      const imageUrl = "http://fake.com";
      const itemAttributes = {title, description, imageUrl};

      const createdItem = await seedItemToDatabase(itemAttributes);

      const response = await request(app)
        .post(`/items/${createdItem._id}/delete`);
      const numberOfItems = await Item.count();
      assert.equal(numberOfItems, 0);
    });

    it('redirects to /', async () => {
      const title = "Fake Item";
      const description = "Fake description";
      const imageUrl = "http://fake.com";
      const itemAttributes = {title, description, imageUrl};

      const createdItem = await seedItemToDatabase(itemAttributes);

      const response = await request(app)
        .post(`/items/${createdItem._id}/delete`);
      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/');
    });
  });

});
