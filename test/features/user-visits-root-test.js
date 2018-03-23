const {assert} = require('chai');

describe('User visits root', () => {
  describe('without existing items', () => {
    it('starts blank', () => {
      browser.url('/');
      assert.equal(browser.getText('#items-container'), '');
    });
  });
  describe('and can navigate', () => {
    it('to /create.html', () => {
      browser.url('/');
      browser.click('a[href="create.html"]');
      assert.include(browser.getText('body'), 'Create');
    });
  });
});
