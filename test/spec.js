var assert = require('assert')
var sinon  = require('sinon')
var ajax   = require('../nanoxhr')

describe('TAGUHB AJAX', function() {

    var requests, xhr;

    before(function () {
        xhr = sinon.useFakeXMLHttpRequest();
        requests = [];
        xhr.onCreate = function (req) { requests.push(req); };
    });

    after(function () {
        xhr.restore();
    });

    afterEach(function() {
        requests = [];
    })

    it('Should call the callback', function() {
        var callback = sinon.spy()
        ajax('some/url').call(callback)
        requests[0].respond(
            200,
            { "Content-Type": "application/json" },
            JSON.stringify([{ id: 1, text: "Provide examples", done: true }])
        )
        assert.equal(requests.length, 1);
        assert.equal(requests[0].url, 'some/url')
        assert.equal(requests[0].method, 'GET')
        assert.ok(callback.calledOnce, 'Callback called')
    })

    it('Should obey passed method', function() {
        ajax('some/url')
            .method('PUT')
            .call()
        assert.equal(requests[0].method, 'PUT')
    })


    it('Should set headers', function() {
        ajax('some/url')
            .set('Content-Type','application-json')
            .set('Mongo-Header','mango')
            .call()
        assert.equal(requests[0].requestHeaders['Content-Type'], 'application-json')
        assert.equal(requests[0].requestHeaders['Mongo-Header'], 'mango')
    })

    it('Should serialize data', function() {
        ajax('some/url')
            .method('POST')
            .data({
                'some'    : 'value',
                'another' : 'value'
            })
            .call()
        assert.ok(requests[0].requestBody.indexOf('some=value') >= 0)
        assert.ok(requests[0].requestBody.indexOf('another=value') >= 0)
        assert.ok(requests[0].requestBody.indexOf('&') > 0)
    })

    it('Should serialize query parameters', function() {
        ajax('some/url')
            .query({
                sort : 'date',
                max  : 10
            })
            .call()
        assert.ok(requests[0].url.indexOf('sort=date') > 0)
        assert.ok(requests[0].url.indexOf('max=10') > 0)
        assert.equal(requests[0].url.indexOf('?'), 8)
    })

    it('Should not conflict with itself', function() {
        var callback_one = sinon.spy()
        var callback_two = sinon.spy()
        ajax('some/url')
            .method('DELETE')
            .call(callback_one)
        ajax('another/url')
            .method('PUT')
            .call(callback_two)
        requests[1].respond(200)
        requests[0].respond(200)
        assert.equal(requests.length, 2)
        assert.equal(requests[0].method, 'DELETE')
        assert.equal(requests[1].method, 'PUT')
        assert.ok(callback_one.calledOnce, 'Callback one called once')
        assert.ok(callback_two.calledOnce, 'Callback two called once')
    })

})
