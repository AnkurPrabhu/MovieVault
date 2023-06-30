const db = require("../util/database");

module.exports = class users {
  constructor(id, username, password, email) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }

  static async fetchall() {
    let sql = "SELECT * FROM user_tbl ";
    let dbresults;
    try {
      dbresults = await new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      console.log(dbresults);
      return dbresults;
    } catch (err) {
      throw err;
    }
  }

  static async addUser(username, password, email) {
    let post = { username: username, password: password, email: email };

    let sql = "INSERT INTO `user_tbl` SET ?";
    let dbresults;
    console.log(post);
    try {
      dbresults = await new Promise((resolve, reject) => {
        db.query(sql, post, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });

      console.log(dbresults);
      return dbresults;
    } catch (err) {
      throw err;
    }
  }

  static async login(username, password) {
    let sql = `SELECT * FROM user_tbl  WHERE username="${username}" AND password= "${password}" `;

    try {
      let dbresults = await new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
      if (dbresults.length > 0) {
        console.log(dbresults);
        return dbresults[0].id;
      } else {
        return -1;
      }
    } catch (err) {
      throw err;
    }
  }
};
