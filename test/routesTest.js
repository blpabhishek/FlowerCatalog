var routes = require('../lib/routes');
var supertest = require('supertest');

describe('Redirect to index.html ',function() {
	it('/',function(done){
		supertest(routes)
			.get('/')
			.expect('Content-Type',/text\/html/)
			.expect(/Flower Catalog/)
			.expect(200,done);
	});
});

describe('get request for a static file',function() {
	it('An image /pbase-agerantum.jpg',function(done){
		supertest(routes)
			.get('/images/pbase-agerantum.jpg')
			.expect('Content-Type',/image\/jpeg/)
			.expect(200,done);
	});
});