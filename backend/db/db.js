const mysql = require("mysql2");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "Amaan@123",
  database: "imgs",
});

module.exports = {
  query: (querytext, params, callback) => {
    pool.query(querytext, params, callback);
  },
};
