const {assert} = require('chai');
const {seedItemToDatabase} = require('../test-utils');

describe('User deletes a single item', () => {

  const title = "Fake Item";
  const description = "Fake description";
  const imageUrl = "http://fake.com";
  const fakeItem = {title, description, imageUrl};

  before(async function() {
     seedItemToDatabase(fakeItem);
  });

  it('clicks on the delete button and no longer sees the item in the list', () => {
    browser.url('/');
    browser.click('.delete-form');
    assert.notInclude(browser.getText('body'), fakeItem.title);
  });
});
