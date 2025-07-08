const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',             // default PostgreSQL username
  host: 'localhost',
  database: 'taskmanager',      // must match the DB you created
  password: 'montech122300', // ⚠️ change this to your pg password
  port: 5432,                   // default PostgreSQL port
});

module.exports = pool;
