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
    const fakeItem = {title, description, imageUrl};

    await seedItemToDatabase(fakeItem);

    const response = await request(app).get(`/items/${fakeItem._id}`);
    assert.include(parseTextFromHTML(response.text, '#item-title'), fakeItem.title);
    assert.include(parseTextFromHTML(response.text, '#item-description'), fakeItem.description);

  });

});
