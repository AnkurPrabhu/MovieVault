import React, { useState } from "react";
import { Button } from "react-bootstrap";
import images from "./images.jpg";
import { FaThumbsUp, FaHeart } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import axios from "axios";

function WatchlistCard({ movie }) {
  if (movie.title.length > 16) {
    movie.title = movie.title.substring(0, 15) + "...";
  }
  let posterUrl = `https://images.unsplash.com/photo-1616530940355-351fabd9524b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80`;
  const [isCardVisible, setIsCardVisible] = useState(true);
  // Function to handle card click
  async function fetch(mainurl, body) {
    try {
      const response = await axios.delete(mainurl, { params: { body } });
      console.log("Movie added successfully:", response.data);
    } catch (error) {
      console.error("Error adding movie:", error.message);
    }
  }

  const removefromfav = async (movie) => {
    let url = `http://localhost:3001/api/remove_watchlist`;
    await fetch(url, movie);
    setIsCardVisible(false);
    console.log(movie);
  };

  return (
    <>
      {isCardVisible && (
        <div className="col-lg-2 col-md-3 col-2">
          <div class="card">
            <img src={posterUrl} class="card-img-top" alt={movie.title} />
            <div class="card-body">
              <h6 class="card-title">{movie.title}</h6>

              <div className="row">
                <div className="col ">
                  <Button onClick={() => removefromfav(movie)}>
                    <MdCancel />
                  </Button>
                </div>
                <div className="col "></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WatchlistCard;
