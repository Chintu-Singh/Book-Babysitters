import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import Avatar from "../Avatar";
import BabyLinks from "./BabyLinks";
import UpdateBaby from "./UpdateBaby";
import AddBaby from "./AddBaby";
import "../account.css";
import "../../colors.css";
import swal from "sweetalert";

const BabyForm = ({ form }) => {
  const { currentPets, setCurrentPets, loading, setLoading } = useContext(
    AppContext
  );
  const [formData, setFormData] = useState({});
  const [petUpdateID, setPetUpdateID] = useState(null);
  const [petUpdate, setPetUpdate] = useState(null);
  const [type, setType] = useState("");
  const [selectID, setSelectID] = useState("");

  useEffect(() => {
    if (petUpdateID) {
      axios
        .get(`/pets/${petUpdateID?.id}`)
        .then(({ data }) => {
          setPetUpdate({ ...petUpdate, data });
          setType(data.type);
        })
        .catch((error) => console.log(error));
    }
    // eslint-disable-next-line
  }, [petUpdateID, loading, currentPets]);

  const submitNewPet = () => {
    if (!formData.description || !formData.name || !formData.type) {
      return swal("Error", "Name, type and description are required", "error");
    }

    axios
      .post("/pets", formData)
      .then(() => {
        swal("Awesome!", "Successfully added child", "success");
      })
      .catch((error) => {
        console.log(error);
        swal("Oops!", "Something went wrong...", "error");
      });
  };

  const updatePet = () => {
    if (!selectID) {
      swal("Something is missing", "Please select a child to update!", "error");
    }
    axios
      .put(`/pets/${selectID}`, formData)
      .then(() => {
        swal("Awesome!", "Successfully updated child", "success");
      })
      .catch((error) => {
        console.log(error);
        swal("Oops!", "Something went wrong...", "warning");
      });
  };

  const deletePet = () => {
    window.confirm(
      "Warning: this action is permanent. Are you SURE you want to delete this pet forever?"
    );
    setLoading(true);
    axios
      .delete(`/pets/${selectID}`)
      .then(() => {
        swal("Success!", "Child deleted!", "success");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    setCurrentPets(
      currentPets.filter((petID) => {
        return petID !== selectID;
      })
    );
    setSelectID("");
  };

  const isAdd = form === "add";
  const isUpdate = form === "update";

  return (
    <div id="pet-forms-container">
      {isUpdate && (
        <UpdateBaby
          setPetUpdateID={setPetUpdateID}
          petUpdateID={petUpdateID}
          setSelectID={setSelectID}
          selectID={selectID}
          currentPets={currentPets || []}
        />
      )}

      {((isUpdate && selectID) || isAdd) && (
        <>
          {isUpdate && (
            <div
              className="pet-form-avatar"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Avatar role={"pets"} petUpdate={petUpdate} />
            </div>
          )}

          <div
            className={isAdd ? "pet-form-links links-add" : "pet-form-links"}
            key={petUpdate?.data.name}
          >
            <BabyLinks selectID={selectID} petUpdate={petUpdate} />
          </div>

          <AddBaby
            submitNewPet={submitNewPet}
            updatePet={updatePet}
            petUpdate={petUpdate}
            isAdd={isAdd}
            formData={formData}
            setFormData={setFormData}
            setType={setType}
            deletePet={deletePet}
            type={type}
          />
        </>
      )}
    </div>
  );
};

export default BabyForm;
