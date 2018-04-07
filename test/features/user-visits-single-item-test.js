const {assert} = require('chai');
const {seedItemToDatabase} = require('../test-utils');

describe('User visits a single item page', () => {

  it('sees item details', async () => {
    const title = "Fake Item";
    const description = "Fake description";
    const imageUrl = "http://fake.com";
    const fakeItem = {title, description, imageUrl};

    await seedItemToDatabase(fakeItem);

    browser.url('/');
    browser.click('.item-card a');
    assert.include(browser.getText('body'), fakeItem.title);
    assert.include(browser.getText('body'), fakeItem.description);
    assert.include(browser.getAttribute('body img', 'src'), fakeItem.imageUrl);
  });
});
