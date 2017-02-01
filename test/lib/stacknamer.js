const expect = require('chai').expect;

const stacknamer = require('../../');

describe('stacknamer', function () {
  it('should work for LAMP stack', function () {
    return stacknamer.search(['linux', 'apache', 'mysql', 'php'])
      .then((results) => {
        expect(results).to.contain('lamp');
        expect(results).to.have.length(3);
      });
  });

  it('should work regardless of capitalisation', function () {
    return stacknamer.search(['Linux', 'Apache', 'PHP', 'MySQL'])
      .then((results) => {
        expect(results).to.contain('lamp');
        expect(results).to.have.length(3);
      });
  });

  it('should allow you to define your own dictionary', function () {
    stacknamer.init(['malp']);
    return stacknamer.search(['Linux', 'Apache', 'PHP', 'MySQL'])
      .then((results) => {
        expect(results).to.contain('malp');
        expect(results).to.have.length(1);
      });
  });
});
