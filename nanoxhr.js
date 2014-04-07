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

var nxhr = function(req, url) {
    this.req      = req
    this.url      = url
    this._data    = null
    this._method  = 'GET'
    this._headers = {}
}
nxhr.prototype.method = function(method) {
    this._method = method
    return this
}
nxhr.prototype.set = function(header, value) {
    this._headers[header] = value
    return this
}
nxhr.prototype.query = function(query) {
    this.url += '?'+serialize(query)
    return this
}
nxhr.prototype.data = function(data) {
    this._data = data
    return this
}
nxhr.prototype.call = function(callback) {
    this.req.onload  = function() { if (this.req.readyState === 4) callback(this.req) }.bind(this)
    this.req.onerror = function() { callback(this.req) }.bind(this)
    // req.onreadystatechange = function () { console.log(req.readyState); if (req.readyState === 4) callback(req) }
    this.req.open(this._method, this.url, false)
    for (var header in this._headers) { this.req.setRequestHeader(header, this._headers[header]); }
    this.req.send(serialize(this._data))
    return this
}

module.exports = function(url) {
    return new nxhr(createRequest(url), url)
};

