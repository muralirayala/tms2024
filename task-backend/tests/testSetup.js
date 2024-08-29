// testSetup.js
const mongoose = require('mongoose');

beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect('mongodb://localhost:27017/taskdb_test', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
    }
});

afterAll(async () => {
  await mongoose.connection.close(); // Correct usage
});
