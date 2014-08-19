# nanoxhr

[![browser support](https://ci.testling.com/asbjornenge/nanoxhr.png)
](https://ci.testling.com/asbjornenge/nanoxhr)

Nanoxhr is a small xhr (ajax) library.

    2640 B nanoxhr.min.js     // minified
    1920 B nanoxhr.min.js.gz  // minified+gzipped

### Install

Nanoxhr is available on npm.

	npm install nanoxhr

### Use

    require('nanoxhr')('/api/cakes')
            .method('POST')
            .set('Content-Type','application-json')
            .set('Cookie','monster=2713cea58e115e44b91928d57b48e832;')
            .data(JSON.stringify({topping:'sprinkles'}))
            .query({amount:5})
            .call(function(res) {
          	    console.log(res.status, res.responseText)
            })

### Docs

For full documentation see the [spec](https://github.com/asbjornenge/nanoxhr/blob/master/test/spec.js).  

enjoy.

### Changelog

#### 1.0.0

* MAJOR: Now doing ***async*** by default!!
* Added .sync as .call alias to perform a sync request
* Added timeout support

#### 0.2.0

* Wrapping req.send in try-catch for send-error handling via callback

#### 0.0.1

* Initial release! :tada:
