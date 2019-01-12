var Seeder = require('mongoose-data-seed').Seeder;
var User = require('../../../dist/tsc/src/server/models/user');

const data = [
    {
        username: "testuser",
        password: "mytestpass"
    },
    {
        username: "user",
        password: "password"
    }
];

var UsersSeeder = Seeder.extend({
  shouldRun: function () {
    return User.count().exec().then(count => count === 0);
  },
  run: function () {
    return User.create(data);
  }
});

module.exports = UsersSeeder;
