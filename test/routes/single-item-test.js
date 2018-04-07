const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  it('includes the item attributes in the response body', async () => {
    const title = "Fake Item";
    const description = "Fake description";
    const imageUrl = "http://fake.com";
    const itemAttributes = {title, description, imageUrl};

    const createdItem = await seedItemToDatabase(itemAttributes);

    const response = await request(app).get(`/items/${createdItem._id}`);
    assert.include(parseTextFromHTML(response.text, '#item-title'), createdItem.title);
    assert.include(parseTextFromHTML(response.text, '#item-description'), createdItem.description);

  });

});
