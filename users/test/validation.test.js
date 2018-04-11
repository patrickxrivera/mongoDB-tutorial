const chai = require('chai');
const User = require('../src/users');

const expect = chai.expect;

describe('VALIDATION', () => {
  it('requires a valid name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    expect(message).to.equal('Name is required.');
  });

  it('requires a name longer than two characters', () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    expect(message).to.equal('Name must be longer than 2 characters.');
  });

  it('should not be able to save an invalid name', (done) => {
    const user = new User({ name: 'Al' });
    user.save().catch((validationResult) => {
      const { message } = validationResult.errors.name;

      expect(message).to.equal('Name must be longer than 2 characters.');
      done();
    });
  });
});
