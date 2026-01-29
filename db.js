const { Pool } = require("pg");

console.log("🔌 Attempting to connect to database...");
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connection immediately
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ DATABASE CONNECTION FAILED:', err.message);
    console.error('Error code:', err.code);
    console.error('Check your DATABASE_URL in .env file');
  } else {
    console.log('✅ Database connected successfully');
    console.log('Database time:', res.rows[0].now);
  }
});

// Test if table exists
pool.query("SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'pastes')", (err, res) => {
  if (err) {
    console.error('❌ Could not check table:', err.message);
  } else {
    console.log('📊 Table "pastes" exists:', res.rows[0].exists);
  }
});

module.exports = pool;