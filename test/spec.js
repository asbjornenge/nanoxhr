var assert             = require('assert')
var fakeXMLHttpRequest = require('./fake_xml_http_request');
var nxhr               = require('../nanoxhr')
XMLHttpRequest         = fakeXMLHttpRequest;

describe('TAGUHB AJAX', function() {

    it('Should call the callback', function(done) {
        var r = nxhr('some/url').call(function(res) {
            assert.equal(res.url, 'some/url')
            assert.equal(res.method, 'GET')
            assert.equal(res.status, 200)
            done()
        })
        r.req.respond(200, { "Content-Type": "application/json" }, JSON.stringify([{ id: 1, text: "Provide examples", done: true }]))
    })

    it('Should obey passed method', function() {
        var r = nxhr('some/url')
            .method('PUT')
            .call()
        assert.equal(r.req.method, 'PUT')
    })

    it('Should set headers', function() {
        var r = nxhr('some/url')
            .set('Content-Type','application-json')
            .set('Mongo-Header','mango')
            .call()
        assert.equal(r.req.requestHeaders['Content-Type'], 'application-json')
        assert.equal(r.req.requestHeaders['Mongo-Header'], 'mango')
    })

    it('Should serialize data', function() {
        var r = nxhr('some/url')
            .method('POST')
            .data({
                'some'    : 'value',
                'another' : 'value'
            })
            .call()
        assert.ok(r.req.requestBody.indexOf('some=value') >= 0)
        assert.ok(r.req.requestBody.indexOf('another=value') >= 0)
        assert.ok(r.req.requestBody.indexOf('&') > 0)
    })

    it('Should serialize query parameters', function() {
        var r = nxhr('some/url')
            .query({
                sort : 'date',
                max  : 10
            })
            .call()
        assert.ok(r.req.url.indexOf('sort=date') > 0)
        assert.ok(r.req.url.indexOf('max=10') > 0)
        assert.equal(r.req.url.indexOf('?'), 8)
    })

})
