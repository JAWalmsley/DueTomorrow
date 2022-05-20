var assert = require('assert')
var dbManager = require('../dbManager')

beforeEach(function() {

})

describe("dbManager", function() {
    describe("getCourses", function() {
        it("should return list of courses belonging to me", function(done) {
            dbManager.getCourses("85dc03ce-426e-4263-9087-8044eed8da62").then(r => done(r))
        })
    })
})