const db = require("../util/database");

module.exports = class movies {
  static MAX_PAGE_LIMIT = 18;
  constructor(movieid, title, director, description) {
    this.movieid = movieid;
    this.title = title;
    this.director = director;
    this.description = description;
  }

  static async fetchall(page) {
    let limit = (page - 1) * movies.MAX_PAGE_LIMIT;

    let sql = `SELECT * FROM movie_tbl LIMIT ${limit},${movies.MAX_PAGE_LIMIT}`;

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

  static async addmovie(title, director, description) {
    let post = { title: title, director: director, description: description };

    let sql = "INSERT INTO `movie_tbl` SET ?";
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

  static async searchMovie(query, page) {
    let limit = (page - 1) * movies.MAX_PAGE_LIMIT;
    console.log(query);
    let sql = `SELECT * FROM movie_tbl WHERE title LIKE '%${query}%' LIMIT ${limit},${movies.MAX_PAGE_LIMIT} `;
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
