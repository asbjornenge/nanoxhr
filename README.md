# nanoxhr

[![browser support](https://ci.testling.com/asbjornenge/nanoxhr.png)
](https://ci.testling.com/asbjornenge/nanoxhr)

Nanoxhr is a small xhr (ajax) library.   

    1510 B nanoxhr.min.js     // minified
     646 B nanoxhr.min.js.gz  // minified+gzipped
     
### Install

Nanoxhr is available on both npm and bower.

	npm install nanoxhr
	bower install nanoxhr
	
### Use

    // Node (browserify)
    var nxhr = require('nanoxhr')
		
    // Browser AMD
    require(['nanoxhr'], function(nxhr) {
        nxhr('/api/cakes')
            .method('POST')
            .set('Content-Type','application-json')
            .set('Cookie','monster=2713cea58e115e44b91928d57b48e832;')
            .data(JSON.stringify({topping:'sprinkles'}))
            .query({amount:5})
            .call(function(res) {
          	    console.log(res.status, res.responseText)
            })
	})
	
	//Browser Script
	<script src="nanoxhr.js"></script>
	
### Docs

For full documentation see the [spec](https://github.com/asbjornenge/nanoxhr/blob/master/test/spec.js).  

enjoy.