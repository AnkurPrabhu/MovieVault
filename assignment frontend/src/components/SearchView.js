import { Button, Container } from "react-bootstrap";
import images from "./images.jpg";
import { FaThumbsUp, FaHeart } from "react-icons/fa";
import CardComponent from "./CardComponent";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
const SearchView = ({}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setSearchResults([]);
  }, [searchText]);
  useEffect(() => {
    if (searchText) {
      // axios
      //   .get(
      //     `http://localhost:3001/api/search?query=${searchText}&page=${page}`
      //   )
      //   .then((response) => {
      //     //  const repo=response.data;
      //     setSearchResults(response.data);

      //   });
      setLoading(true);
      setError(false);
      let cancel;
      axios({
        method: "GET",
        url: "http://localhost:3001/api/search?",
        params: { query: searchText, page: page },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
        .then((res) => {
          setSearchResults((prevsetSearchResults) => {
            return [...new Set([...prevsetSearchResults, ...res.data])];
          });
          setHasMore(res.data.length > 0);

          setLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
    }
  }, [searchText, page]);
  const navigate = useNavigate();
  const observer = useRef();
  const updatesearchtext = (e) => {
    navigate("/search");
    setSearchText(e.target.value);
    setPage(1);
  };

  const lastmovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("chaing page", page);
          setPage((prevsetPage) => prevsetPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // let resultshtml= searchResults.map((obj,i) => {
  // return <CardComponent  movie={obj} key={i}/>

  // })

  // if(searchText==""){
  //   resultshtml= <h1>search  a movie </h1>
  // }

  return (
    <>
      <div>
        {" "}
        <p></p>
      </div>
      <Container>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchText}
            onChange={updatesearchtext}
          />
        </Form>
      </Container>

      {searchResults && (
        <div className="container">
          <div className="row">
            {searchResults.map((movie, index) => {
              if (searchResults.length === index + 1) {
                return (
                  <div
                    className="col-md-4"
                    ref={lastmovieElementRef}
                    key={index}
                  >
                    <CardComponent movie={movie} />
                  </div>
                );
              } else {
                return (
                  <div className="col-md-2" key={index}>
                    <CardComponent movie={movie} />
                  </div>
                );
              }
            })}
          </div>
          <div>{loading && "Loading..."}</div>
          <div>{error && "Error"}</div>
        </div>
      )}
    </>
  );
};

export default SearchView;
