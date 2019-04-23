var mongoose = require('mongoose');
var config = require('config');

var UserSchema = require('../../models/User').model('user').schema

var TestUserModel = mongoose.model('testUserModel', UserSchema);

describe('Create a instance of testUserModel', function() {
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
		var testUserModel = new TestUserModel();
    //mocking current system time
    var baseTime = new Date(2013, 9, 23);
    jasmine.clock().mockDate(baseTime);

    testUserModel.name = 'Adam Smith';
		testUserModel.email = 'test@test.cpm';
    testUserModel.password = '123456';
    testUserModel.register_date = new Date().getTime();
		testUserModel.save(function(err) {
			expect(err).toBeNull();
			testUserModel.find(function(err, result) {
				expect(result.length).toBe(3);
				expect(result[0].name).toBe('Adam Smith');
				expect(result[0].email).toBe('test@test.com');
        expect(result[0].password).toBe('123456');
        expect(result[0].register_date).toEqual(baseTime.getTime());
			});
		});
	});
});