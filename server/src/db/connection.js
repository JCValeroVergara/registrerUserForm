const pool = require('./postgres');

const connection = async () => {
  try {
    const client = await pool.connect();
    console.log('Connection to DB successful');
    client.release();
    return true;
  } catch (error) {
    console.log('Connection to DB failed', error);
    return false;
  }
}

module.exports = connection;
