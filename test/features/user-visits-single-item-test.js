const {assert} = require('chai');
const {seedItemToDatabase} = require('../test-utils');

describe('User visits a single item page', () => {

  const title = "Fake Item";
  const description = "Fake description";
  const imageUrl = "http://fake.com";
  const fakeItem = {title, description, imageUrl};

  before(async function() {
    seedItemToDatabase(fakeItem);
  });

  it('sees item details', () => {
    browser.url('/');
    browser.click('.item-card a');
    assert.include(browser.getText('#item-title'), fakeItem.title);
    assert.include(browser.getText('#item-description'), fakeItem.description);
    assert.include(browser.getAttribute('.single-item-img img', 'src'), fakeItem.imageUrl);
  });
});
