import expect from 'expect.js';
import greetings from '../index';
import jsdom from 'mocha-jsdom';

describe('index', function() {
  jsdom();

  context('when a message equals to hello world is given', function() {
    beforeEach(function () {
      const message = 'hello world';
      greetings(message);
    });

    it('document body should contain hello world', function() {
      expect(document.body.innerHTML).to.equal("hello world");
    });
  });
});
