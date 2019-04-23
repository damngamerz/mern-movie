var mongoose = require('mongoose');
var config = require('config');

var ItemSchema = require('../../models/Item').model('item').schema

var TestItemModel = mongoose.model('testItemModel', ItemSchema);

describe('Create a instance of testItemModel', function() {
	beforeEach(function() {
		mongoose.connect(config.get('mongoURI'), { 
      useNewUrlParser: true,
      useCreateIndex: true
    });
	});

	afterEach(function() {
    mongoose.connection.dropDatabase()
		, function(err, result) {
			console.log(err);
			console.log(result);
			process.exit(0);
		};
	});

	it('should save to the database', function() {
		var testItemModel = new TestItemModel();
		//mocking current system time
		var baseTime = new Date(2013, 9, 23);
		jasmine.clock().mockDate(baseTime);

		testItemModel.name = 'Avenger';
		testItemModel.release_date = '20-06-17';
    testItemModel.duration = '2 hours';
    testItemModel.actors = 'RDJ';
    testItemModel.average_user_rating = '3';
		testItemModel.date = new Date().getTime();
		testItemModel.save(function(err) {
			expect(err).toBeNull();
			testItemModel.find(function(err, result) {
				expect(result.length).toBe(5);
				expect(result[0].name).toBe('Avenger');
				expect(result[0].release_date).toBe('20-06-17');
        expect(result[0].duration).toBe('2 hours');
        expect(result[0].actors).toEqual('RDJ');
        expect(result[0].average_user_rating).toEqual('3');
				expect(result[0].date).toEqual(baseTime.getTime());
			});
		});
	});
});