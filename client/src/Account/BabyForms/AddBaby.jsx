import React from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@material-ui/core";

const petTypes = ["< 1", "1-3", "3-5", "> 5"];

const basicInfoFields = [
  "description",
  "emergency",
  "medical",
  "feeding",
  "additional",
];

const AddBaby = ({
  submitNewPet,
  updatePet,
  petUpdate,
  isAdd,
  setFormData,
  type,
  setType,
  deletePet,
  formData,
}) => (
  <form
    className="pet-info-form"
    key={petUpdate?.data._id}
    onSubmit={isAdd ? submitNewPet : updatePet}
  >
    <Typography variant="h5" component="div" style={{ marginBottom: "10px" }}>
      {isAdd ? "Enter new child Information" : "Update Child Information"}
    </Typography>

    <div className="forms-container">
      <TextField
        onChange={(e) =>
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
        defaultValue={petUpdate?.data.name}
        className="tab-input"
        variant="outlined"
        label="Enter Name"
        type="text"
        name="name"
        required
      />

      <FormControl className="tab-input" variant="outlined">
        <InputLabel id="type">Select Age</InputLabel>
        <Select
          style={{ textAlign: "left" }}
          value={type}
          name="type"
          onChange={(e) => {
            setFormData({
              ...formData,
              [e.target.name]: e.target.value,
            });
            setType(e.target.value);
          }}
          label="type"
        >
          <MenuItem />
          {petTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {basicInfoFields.map((field) => (
        <TextField
          onChange={(e) =>
            setFormData({
              ...formData,
              [e.target.name]: e.target.value,
            })
          }
          defaultValue={petUpdate?.data[field]}
          key={field}
          className="tab-input"
          variant="outlined"
          label={`${field === "description" ? field : field + " instructions"}`}
          type="text"
          name={field}
          multiline
          required={field === "description"}
          rows="2"
        />
      ))}

      <div className="pet-info-submit">
        <Button
          type="submit"
          className="card-btn pet-btn"
          style={{ backgroundColor: "black" }}
        >
          Submit Changes
        </Button>
        {petUpdate && (
          <Button
            onClick={deletePet}
            className="card-btn pet-btn"
            style={{ background: "red" }}
          >
            Remove Child
          </Button>
        )}
      </div>
    </div>
  </form>
);

export default AddBaby;
