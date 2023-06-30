const db = require("../util/database");

module.exports = class watched {
  constructor(watchid, user_id, movie_id, rating) {
    this.watchid = watchid;
    this.user_id = user_id;
    this.movie_id = movie_id;
    this.rating = rating;
  }
  static async fetchall(user_id) {
    console.log(user_id);

    let sql = `SELECT movie_tbl.*,watchedmovies_tbl.*
    FROM watchedmovies_tbl
    INNER JOIN movie_tbl ON watchedmovies_tbl.movie_id = movie_tbl.movie_id
    WHERE watchedmovies_tbl.user_id =${user_id}`;
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

      console.log(JSON.stringify(dbresults));
      return dbresults;
    } catch (err) {
      throw err;
    }
  }

  static async addToWatchedList(user_id, movie_id) {
    let post = { user_id: user_id, movie_id: movie_id };

    let sql = "INSERT INTO `watchedmovies_tbl` SET ?";
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

  static async removeFromWatchedList(watched_id) {
    let sql = `DELETE FROM watchedmovies_tbl WHERE watched_id = ${watched_id}`;
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

  static async setrating(watched_id, rating, user_id) {
    let sql = `UPDATE watchedmovies_tbl SET rating = ${rating} WHERE watched_id= ${watched_id} AND user_id =${user_id} `;
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
};
