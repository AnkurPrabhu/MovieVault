import React, { useState, useEffect } from "react";
import axios from "axios";
import WatchedlistCard from "./WatchedlistCard";

export default function Watched() {
  const [watchlist, setWatchlist] = React.useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/watchedlist", {
        params: { user: localStorage.getItem("id") },
      })
      .then((response) => {
        setWatchlist(response.data);
        //  const repo=response.data;
      });
  }, []);

  const title = `Movies you have watched`;

  let resultshtml;

  resultshtml = watchlist.map((obj, i) => {
    return <WatchedlistCard movie={obj} keys={i} />;
  });

  if (watchlist.length === 0) {
    resultshtml = <h1>oops no movies in watched </h1>;
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
