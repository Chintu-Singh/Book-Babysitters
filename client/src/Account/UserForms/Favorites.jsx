import React, { useState, useEffect, useContext } from "react";
import "../account.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { Typography } from "@material-ui/core";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";

const Favorites = () => {
  const { loading, setLoading, currentUser } = useContext(AppContext);
  const [currentFavOwners, setCurrentFavOwners] = useState([]);
  const [currentFavSitters, setCurrentFavSitters] = useState([]);
  const [currentFavPets, setCurrentFavPets] = useState([]);

  useEffect(() => {
    axios
      .get("/user/me/favorites", { withCredentials: true })
      .then(({ data }) => {
        const favPets = data[0].pets;
        const favOwners = data[1].owners;
        const favSitters = data[2].sitters;
        setCurrentFavPets([...currentFavPets, ...favPets]);
        setCurrentFavOwners([...currentFavOwners, ...favOwners]);
        setCurrentFavSitters([...currentFavSitters, ...favSitters]);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line
  }, [currentUser, loading]);

  const cards = (array, role) => {
    let profile = "favUsers";
    let page = "userprofile";
    if (array === currentFavPets) {
      profile = "favPets";
      page = "petprofile";
    }
    return (
      <>
        <Typography variant="h5">Favourite {role}</Typography>
        <div className="fav-box">
          {array?.map((result) => {
            return (
              <div className="fav-card" key={result._id}>
                <FavoriteTwoToneIcon
                  onClick={(e) => toggleFav(e, profile, result._id)}
                  className="heart"
                />
                <hr />
                <Typography
                  component={Link}
                  to={`/${page}/${result?._id}`}
                  style={{ fontSize: "25px" }}
                >
                  👨‍👧 {result?.name}
                </Typography>
                <br />
                <Typography variant="button">{result?.type}</Typography>
                <hr />
                <p style={{ textAlign: "center" }}>
                  {result?.description?.slice(0, 200)}
                  {result?.description?.length > 200 && "..."}
                </p>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const toggleFav = (e, profile, id) => {
    axios
      .put(`/user/me/favorites?id=${id}&profile=${profile}`, {
        withCredentials: true,
      })
      .then(({ data }) => {})
      .catch((error) => console.log(error))
      .finally(() => {
        setCurrentFavOwners([]);
        setCurrentFavPets([]);
        setCurrentFavSitters([]);
        setLoading(!loading);
      });
    let heart = e.target.style;
    if (heart.color === "red") {
      heart.color = "gray";
    } else {
      heart.color = "red";
    }
  };

  return (
    <div>
      {cards(currentFavSitters, "Maids and Babysitters")}
      <hr />
      {cards(currentFavOwners, "House Owners")}
    </div>
  );
};

export default Favorites;
