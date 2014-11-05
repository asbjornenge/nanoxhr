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

var nxhr = function(url) {
    this.req             = new XMLHttpRequest()
    this.url             = url
    this._async          = true
    this._data           = null
    this._method         = 'GET'
    this._headers        = {}
    this.callback_called = false
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
nxhr.prototype.timeout = function(ms) {
    this._timeout = ms
    return this
}

nxhr.prototype.respond = function (callback) {
    if (!this.callback_called) { callback(this.req); this.callback_called = true }
}
nxhr.prototype.sync  = function(callback) {
    this._async = false
    return this.call(callback)
}
nxhr.prototype.call = function(callback) {
    this.callback_called = false
    this.req.onload      = function() { this.respond(callback) }.bind(this)
    this.req.onerror     = function() { this.respond(callback) }.bind(this)
    this.req.ontimeout   = function() { this.respond(callback) }.bind(this)
    if (this._timeout) this.req.timeout = this._timeout
    this.req.open(this._method, this.url, this._async)
    for (var header in this._headers) { this.req.setRequestHeader(header, this._headers[header]); }
    try { this.req.send(serialize(this._data)) } catch(err) { this.respond(callback) }
    return this
}

module.exports = function(url) {
    return new nxhr(url)
}
