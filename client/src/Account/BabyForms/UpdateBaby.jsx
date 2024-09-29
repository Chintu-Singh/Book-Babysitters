import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";

const UpdateBaby = ({ setPetUpdateID, petUpdateID, setSelectID, selectID }) => {
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
    <div className="pet-select-id">
      <Typography variant="h5">Select child to update: </Typography>
      <FormControl className="tab-input" variant="outlined">
        <InputLabel id="type">Child ID</InputLabel>
        <Select
          style={{ textAlign: "left" }}
          value={selectID}
          name="_id"
          onChange={(e) => {
            setPetUpdateID({ ...petUpdateID, id: e.target.value });
            setSelectID(e.target.value);
          }}
          label="pet"
        >
          <MenuItem disabled>Select Child</MenuItem>
          {petList &&
            petList
              .map((pet) => (
                <MenuItem key={pet._id} value={pet._id}>
                  {pet.name}
                </MenuItem>
              ))
              .reverse()}
        </Select>
      </FormControl>
    </div>
  );
};

export default UpdateBaby;
