import React, { useState, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import images from "./images.jpg";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp, FaHeart } from "react-icons/fa";
import axios from "axios";

function CardComponent({ movie, key }) {
  if (movie.title.length > 16) {
    movie.title = movie.title.substring(0, 15) + "...";
  }
  let posterUrl = `https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80`;
  const [isCardVisible, setIsCardVisible] = useState(true);
  const navigate = useNavigate();

  async function fetch(mainurl, body) {
    if (localStorage.getItem("id") === null) {
      navigate("/login");
    }

    body.user_id = localStorage.getItem("id");
    try {
      const response = await axios.post(mainurl, body);
      console.log("Movie added successfully:", response.data);
    } catch (error) {
      console.error("Error adding movie:", error.message);
    }
  }
  const addTOFav = async (movie) => {
    console.log("added");
    let url = `http://localhost:3001/api/add_watchedlist`;
    await fetch(url, movie);
    setIsCardVisible(false);
    console.log(movie);
  };

  const addTOWatchList = async (movie) => {
    let url = `http://localhost:3001/api/add_watchlist`;
    await fetch(url, movie);
    setIsCardVisible(false);
    console.log(movie);
  };

  return (
    <>
      {isCardVisible && (
        <div key={key} className="">
          <div className="card">
            <img src={posterUrl} class="card-img-top" alt={movie.title}></img>
            <div class="card-body">
              <h6 class="card-title"> {movie.title} </h6>

              <div className="row">
                <div className="col ">
                  <Button onClick={() => addTOWatchList(movie)}>
                    <FaThumbsUp />
                  </Button>
                </div>
                <div className="col "></div>

                <div className="col ">
                  <Button onClick={() => addTOFav(movie)}>
                    <FaHeart />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CardComponent;
