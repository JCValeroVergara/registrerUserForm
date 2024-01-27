require('dotenv').config();
const http = require('http');
const app = require('./app');
const connection = require('./db/connection');
const { syncModels} = require('./db/sequelize');

const port = process.env.PORT


const server = http.createServer(app);


connection().then((result) => {
  if (result) {
    server.listen(port, async () => {
      console.log(`Server is running on port ${port}`);
      await syncModels();
    });
  }
});
