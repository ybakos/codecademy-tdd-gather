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

});
