import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Card, CardContent } from "@material-ui/core";
import { AppContext } from "../context/AppContext";
import Logout from "../Login/Logout";
import TabPane from "./TabPane";
import "./account.css";
import axios from "axios";

const AccountPage = () => {
  const { currentUser } = useContext(AppContext);
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    axios
      .get("/user/me", { withCredentials: true })
      .then((res) => {
        let pets = res.data.ownedPets;
        setPetList([...petList, ...pets]);
      })
      .catch((error) => console.log(error));
    // eslint-disable-next-line
  }, [setPetList]);

  return (
    <div id="acct-container">
      <Card className="gradient-border" elevation={3}>
        <CardContent className="card-inside" style={{ padding: "20px" }}>
          <Typography variant="h3" gutterBottom>
            {`Welcome ${currentUser && currentUser.name}!`}
          </Typography>
          <Typography variant="h5" gutterBottom id="account-header-subtitle">
            Your DashBoard
          </Typography>
          <Typography variant="button" id="account-header-links">
            <Link to={`/userprofile/${currentUser && currentUser._id}`}>
              View Your Profile
            </Link>
            <Logout styleType={{ fontWeight: "bold", padding: "0" }} />
          </Typography>
          {currentUser?.owner && (
            <>
              <Typography className="header-pets" variant="body1">
                Your Children:
              </Typography>
              <Typography
                component="div"
                variant="button"
                className="header-pets-list"
              >
                {petList?.map((pet) => {
                  return (
                    <Link key={pet._id} to={`/petprofile/${pet._id}`}>
                      {pet.name}
                    </Link>
                  );
                })}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>

      <TabPane />
    </div>
  );
};

export default AccountPage;
