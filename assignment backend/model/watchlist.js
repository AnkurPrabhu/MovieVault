const db = require("../util/database");

module.exports = class watchlist {
  constructor(watchlist_id, user_id, movie_id) {
    this.watchlistid = watchlist_id;
    this.user_id = user_id;
    this.movie_id = movie_id;
  }
  static async fetchall(user_id) {
    let sql = `SELECT movie_tbl.*,watchlist_tbl.*
    FROM watchlist_tbl
    INNER JOIN movie_tbl ON watchlist_tbl.movie_id = movie_tbl.movie_id
    WHERE watchlist_tbl.user_id =${user_id}`;
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

  static async addToWatchList(user_id, movie_id) {
    let post = { user_id: user_id, movie_id: movie_id };

    let sql = "INSERT INTO `watchlist_tbl` SET ?";
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

  static async removeFromWatchList(watchlist_id) {
    let sql = `DELETE FROM watchlist_tbl WHERE watchlist_id= ${watchlist_id}`;

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
