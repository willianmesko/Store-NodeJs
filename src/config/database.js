const { Pool } = require('pg');

const pool = new Pool({
  user: 'launchstore',
  password: 'launchstore',
  host: 'localhost',
  port: 5432,
  database: 'launchstoredb'
})

module.exports = pool
