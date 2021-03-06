const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Model: Item', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  describe('#title', () => {
    it('should be a String', () => {
      const titleAsInteger = 42;
      const item = new Item({title: titleAsInteger});
      assert.strictEqual(item.title, titleAsInteger.toString());
    });
    it('is required', () => {
      const item = new Item();
      item.validateSync();
      assert.equal(item.errors.title.message, 'Path `title` is required.');
    });
  });

  describe('#description', () => {
    it('should be a String', () => {
      const descriptionAsInteger = 42;
      const item = new Item({description: descriptionAsInteger});
      assert.strictEqual(item.description, descriptionAsInteger.toString());
    });
    it('is required', () => {
      const item = new Item();
      item.validateSync();
      assert.equal(item.errors.description.message, 'Path `description` is required.');
    });
  });

  describe('#imageUrl', () => {
    it('should be a String', () => {
      const imageUrlAsInteger = 42;
      const item = new Item({imageUrl: imageUrlAsInteger});
      assert.strictEqual(item.imageUrl, imageUrlAsInteger.toString());
    });
    it('is required', () => {
      const item = new Item();
      item.validateSync();
      assert.equal(item.errors.imageUrl.message, 'Path `imageUrl` is required.');
    });
    it('is a valid url', () => {
      const item = new Item({imageUrl: 'invalid url'});
      item.validateSync();
      assert.equal(item.errors.imageUrl.message, 'Path `imageUrl` is invalid (invalid url).');
    });
  });

});
