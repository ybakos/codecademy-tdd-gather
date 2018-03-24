const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits the create page', () => {
  describe('posts an item', () => {
    it('sees it rendered', () => {
      const item = buildItemObject();

      browser.url('/create.html');
      browser.setValue('#title-input', item.title);
      browser.setValue('#description-input', item.description);
      browser.setValue('#imageUrl-input', item.imageUrl);
      browser.click('#submit-button');
      assert.include(browser.getText('body'), item.title);
      assert.include(browser.getAttribute('body img', 'src'), item.imageUrl);
    });
  });
});
