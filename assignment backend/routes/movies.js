const express = require("express");
const router = express.Router();

const { getAllMovies, addMovie, searchMovie } = require("../controller/movies");

router.get("/movies", getAllMovies);
router.post("/addMovie", addMovie);
router.get("/search", searchMovie);

module.exports = router;
