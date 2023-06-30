const express = require("express");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// My routes

const userRoutes = require("./routes/users");
const moviesRoutes = require("./routes/movies");
const watchlistRoutes = require("./routes/watchlist");
const watchedRoutes = require("./routes/watched");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", moviesRoutes);
app.use("/api", watchlistRoutes);
app.use("/api", watchedRoutes);

//DB connection
// const db= mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'movie_flix'
// });

// db.connect(err=>{
//      if(err){
//         throw err
//      }
//      console.log('Database Connected')
// });

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE movie_flix";

  db.query(sql, (err) => {
    if (err) {
      throw err;
    }

    res.send("Database created");
  });
});

app.get("/createtable_User", (req, res) => {
  let sql =
    "CREATE TABLE User_tbl(id int AUTO_INCREMENT,username VARCHAR(255),password VARCHAR(255),email VARCHAR(255),PRIMARY KEY(id))";

  db.query(sql, (err) => {
    if (err) {
      throw err;
    }

    res.send("User_tbl created");
  });
});

app.get("/createtable_Movie", (req, res) => {
  let sql =
    "CREATE TABLE Movie_tbl(movie_id int AUTO_INCREMENT,title VARCHAR(255),director VARCHAR(255),description VARCHAR(255),PRIMARY KEY(movie_id))";

  db.query(sql, (err) => {
    if (err) {
      throw err;
    }

    res.send("Movie_tbl created");
  });
});

app.listen("3001", () => {
  console.log("server started on port 3001");
});
