const User = require('../src/users');
const chai = require('chai');
const initTestSetup = require('./testSetup');

initTestSetup();

const expect = chai.expect;

describe('CREATE', () => {
  it('saves a user', async () => {
    const joe = new User({ name: 'Joe' });
    await joe.save();

    expect(joe.isNew).to.be.false;
  });
});
