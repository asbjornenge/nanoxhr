function createRequest(url) {
    var req;
    if (typeof 'XMLHttpRequest' === 'undefined' && typeof 'ActiveXObject' !== 'undefined') {
        req = new ActiveXObject('Microsoft.XMLHTTP');
    }
    // CORS (IE8-9)
    if (url.indexOf('http') === 0 && typeof XDomainRequest !== 'undefined') {
        req = new XDomainRequest();
    }
    // local, CORS (other browsers)
    req = new XMLHttpRequest();
    req.nano = {
        url     : url,
        data    : null,
        method  : 'GET',
        headers : {}
    }
    return req;
}

function serialize(data) {
    if (typeof data !== 'string') {
        var serialized = []
        for (var datum in data) {
            serialized.push(datum + '=' + data[datum])
        }
        data = serialized.join('&')
    }
    return data
}

var nxhr = function(req) {

    if (typeof req === 'string') { req = createRequest(req) }

    return {
        method : function(method) {
            req.nano.method = method;
            return nxhr(req)
        },
        set : function(header, value) {
            req.nano.headers[header] = value;
            return nxhr(req)
        },
        query : function(query) {
            req.nano.url += '?'+serialize(query)
            return nxhr(req)
        },
        data : function(data) {
            req.nano.data = data;
            return nxhr(req)
        },
        call : function(callback) {
            req.onload  = function() {if (req.readyState === 4) callback(req)}
            req.onerror = function() {callback(req)};
            // req.onreadystatechange = function () { console.log(req.readyState); if (req.readyState === 4) callback(req) }
            req.open(req.nano.method, req.nano.url, false);
            for (var header in req.nano.headers) { req.setRequestHeader(header, req.nano.headers[header]); }
            req.send(serialize(req.nano.data))
        }
    }
}

module.exports = nxhr;

