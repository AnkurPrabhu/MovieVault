import React, { useState, useEffect } from "react";
import axios from "axios";
import WatchlistCard from "./watchlistCard";
import { useNavigate } from "react-router-dom";

export default function Watchlist() {
  const [watchlist, setWatchlist] = React.useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/watchlist/", {
        params: { user: localStorage.getItem("id") },
      })
      .then((response) => {
        setWatchlist(response.data);
        const repo = response.data;
      });
  }, []);

  // fetchWatchList()
  const title = `Movies you would love to watch`;

  //  const repo=response.data;
  let resultshtml;

  resultshtml = watchlist.map((obj, i) => {
    return <WatchlistCard movie={obj} keys={i} />;
  });

  if (watchlist.length === 0) {
    resultshtml = <h1>oops nothing to watch </h1>;
  }
  return (
    <>
      {<div> {title} </div>}
      {watchlist.length > 0 && (
        <div className="container">
          <div className="row">{resultshtml}</div>
        </div>
      )}
    </>
  );
}
