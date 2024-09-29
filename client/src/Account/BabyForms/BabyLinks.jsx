import React, { useState, useContext } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import "../account.css";
import "../../colors.css";
import swal from "sweetalert";

const BabyLinks = ({ selectID, petUpdate }) => {
  const { setLoading } = useContext(AppContext);
  const [currentLink, setCurrentLink] = useState(null);

  const addLink = () => {
    setLoading(true);
    axios
      .post(`/pets/${selectID}/link`, currentLink)
      .then(() => {
        swal("Success!", "Link added!", "success");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const editLink = () => {
    setLoading(true);
    axios
      .put(`/pets/${selectID}/link/${currentLink?._id}`, currentLink)
      .then(() => {
        swal("Success!", "Link edited!", "success");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentLink || !currentLink.text || !currentLink.url) {
      return swal(
        "Oops!",
        "Please fill both the text and url fields.",
        "error"
      );
    }
    currentLink?._id ? editLink() : addLink();
    const form = e.target;
    form.reset();
  };

  const deleteLink = (id) => {
    setLoading(true);
    axios
      .delete(`/pets/${selectID}/link/${id}`)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Typography
        variant="h5"
        style={{ marginBottom: "10px", marginLeft: "20px", textAlign: "left" }}
      >
        Add, Edit or Delete Links
      </Typography>
      <form
        onSubmit={handleSubmit}
        key={currentLink?._id}
        className="submit-links"
      >
        <TextField
          style={{ marginBottom: "15px" }}
          onChange={(e) =>
            setCurrentLink({ ...currentLink, [e.target.name]: e.target.value })
          }
          defaultValue={currentLink?.text}
          variant="outlined"
          label="Link Text"
          type="text"
          name="text"
        />
        <TextField
          onChange={(e) =>
            setCurrentLink({ ...currentLink, [e.target.name]: e.target.value })
          }
          defaultValue={currentLink?.url}
          variant="outlined"
          label="Link URL"
          type="text"
          name="url"
        />
        <Button
          type="submit"
          className="add-btn card-btn"
          style={{ backgroundColor: "black" }}
        >
          Submit Form
        </Button>
        <Button
          onClick={() => setCurrentLink(null)}
          className="add-btn card-btn"
          style={{ backgroundColor: "black" }}
        >
          Clear Form
        </Button>
      </form>

      {petUpdate?.data.links
        .map((link) => {
          return (
            <div key={link?._id} className="links-wrapper">
              <div className="links-btns">
                <Button
                  onClick={() =>
                    setCurrentLink({
                      _id: link._id,
                      text: link.text,
                      url: link.url,
                    })
                  }
                  className="edit-btn"
                  style={{ backgroundColor: "black" }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteLink(link._id)}
                  className="delete-btn"
                  style={{ backgroundColor: "red" }}
                >
                  Delete
                </Button>
              </div>
              <div className="links-text">
                <span>
                  <b>Link:</b> {link.text}
                </span>
                <span>
                  <b>URL:</b> {link.url}
                </span>
              </div>
            </div>
          );
        })
        .reverse()}
    </>
  );
};

export default BabyLinks;
