import React, { useContext, useState } from "react";
import "../account.css";
import "../../colors.css";
import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import Avatar from "../Avatar";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

const UpdateAccount = () => {
  const history = useHistory();
  const [formData, setFormData] = useState(null);
  const { currentUser, setCurrentUser, setLoading } = useContext(AppContext);

  const checkPasswords = () => {
    if (formData.password && !formData.confirmPassword) {
      return swal("Oops", "You must type the password confirmation!", "error");
    }
    if (!formData.password && formData.confirmPassword) {
      return swal(
        "Oops",
        "You must type the password and the confirm password to change password!",
        "error"
      );
    }
    if (formData.password !== formData.confirmPassword) {
      return swal("Error!", "Passwords must match!", "error");
    }
    if (formData.password.length < 6) {
      return swal(
        "Error",
        "Password must be longer than 6 characters!",
        "error"
      );
    }
    if (formData.password.toLowerCase().includes("password")) {
      return swal(
        "Error",
        "Password cannot contain the word password",
        "error"
      );
    }
    delete formData.confirmPassword;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData?.password) {
      checkPasswords();
    }
    axios
      .put("/user/me", formData, { withCredentials: true })
      .then((response) => {
        setCurrentUser(response.data);
        swal("Success!", "Successfully updated account", "success");
      })
      .catch((error) => {
        console.log(error);
        swal("Oops!", "Something went wrong...", "error");
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = () => {
    window.confirm(
      "Warning: this action is permanent. Are you SURE you want to delete your account forever?"
    );
    axios
      .delete(`/user/me`, { withCredentials: true })
      .then(() => {
        setCurrentUser(null);
        sessionStorage.removeItem("user");
        history.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="user-tab-content">
      <div className="user-tab-grid">
        <Avatar role={"user"} />
      </div>
      <div className="user-tab-grid">
        {currentUser &&
          ["name", "email", "password", "confirmPassword"].map((el) => {
            return (
              <TextField
                key={el}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                defaultValue={
                  el === "name"
                    ? currentUser?.name
                    : el === "email"
                    ? currentUser?.email
                    : ""
                }
                className="tab-input"
                variant="outlined"
                label={el}
                type={
                  el === "name" ? "text" : el === "email" ? "email" : "password"
                }
                name={el}
              />
            );
          })}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="user-tab-grid" key={currentUser?._id}>
          <TextField
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            defaultValue={currentUser?.description}
            className="tab-input"
            variant="outlined"
            label="Enter some info about you"
            type="text"
            name="description"
            multiline
            rows="12"
          />
        </div>
        <div className="user-tab-grid">
          <Button
            type="submit"
            className="card-btn"
            style={{
              width: "100%",
              height: "50px",
              margin: "20px",
              backgroundColor: "black",
            }}
          >
            Submit Changes
          </Button>
          <Button
            onClick={handleDelete}
            className="card-btn"
            style={{ width: "100%", height: "50px", background: "red" }}
          >
            Delete Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAccount;
