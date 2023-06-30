const mysql= require ('mysql')
const config = require('../config.json')

const pool= mysql.createPool({

    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password
});

pool.getConnection((err,connection)=> {
    if(err)
    throw err;
    console.log('Database connected successfully');
    connection.release();
  });

  module.exports =pool;