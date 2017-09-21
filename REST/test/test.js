var chai   = require('chai');
var assert = chai.assert,
    expect = chai.expect;
// module.exports = script
var script = require('../script');

describe("Sanity check", function() {
  describe("runs", function() {
    it("doesn't crash", function() {
       script.getYourRepos("invalid_token");
    });
  });
});