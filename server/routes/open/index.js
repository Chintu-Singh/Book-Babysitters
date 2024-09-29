const router = require("express").Router();
const User = require("../../db/models/user");
const Pet = require("../../db/models/baby");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const { WelcomeEmail, ForgotPassword } = require("../../emails");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

router.get("/search/pet", async (req, res) => {
  const { query } = req.query;
  try {
    const pets = await Pet.find({
      $or: [
        { name: { $regex: `${query}`, $options: "i" } },
        { description: { $regex: `${query}`, $options: "i" } },
      ],
    });
    if (!pets) {
      res.sendStatus(410).json("nothing found");
    } else {
      res.status(200).json(pets);
    }
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Search User by Name OR Description
router.get("/search/user", async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.find({
      $or: [
        { name: { $regex: `${query}`, $options: "i" } },
        { description: { $regex: `${query}`, $options: "i" } },
      ],
    });
    if (!users) {
      res.sendStatus(410).json("nothing found");
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    if (!pets) {
      res.sendStatus(410);
    } else {
      res.status(200).json(pets);
    }
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Get Pet by ID
router.get("/pets/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      res.sendStatus(410);
    } else {
      res.status(200).json(pet);
    }
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.get("/pets/:id/events", async (req, res) => {
  try {
    const events = await Pet.findById(req.params.id, "events");
    if (!events) {
      res.sendStatus(410);
    } else {
      res.status(200).json(events);
    }
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Get Events by User ID
router.get("/users/:id/events", async (req, res) => {
  try {
    const events = await User.findById(req.params.id, "events");
    if (!events) {
      res.sendStatus(410);
    } else {
      res.status(200).json(events);
    }
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      res.sendStatus(410);
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Get User by ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.sendStatus(410);
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.post("/users", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(403)
      .json("Sorry, an account with that email already exists.");
  }
  try {
    if (req.body.owner === "owner") {
      req.body.owner = true;
    } else {
      req.body.owner = false;
    }
    const newUser = new User(req.body);
    WelcomeEmail(newUser.email, newUser.name);
    const token = await newUser.generateAuthToken();
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "Strict",
      // secure: process.env.NODE_ENV !== 'production' ? false : yatrue
    });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// User Login
router.post("/user/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "Strict",
      // secure: process.env.NODE_ENV !== 'production' ? false : true
    });
    res.status(200).json({ message: "Logged in!", data: user });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.get("/password", async (req, res) => {
  try {
    const { email } = req.query,
      user = await User.findOne({ email });
    if (!user) throw new Error("account doesn't exist");
    const token = jwt.sign(
      { _id: user._id.toString(), name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );
    // console.log('sending out token', token);
    ForgotPassword(email, token);
    res.json({ message: "reset password email sent" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

// Password Redirect
router.get("/password/:token", (req, res) => {
  const { token } = req.params;
  try {
    const [parsedToken] = token.split("++target=");
    jwt.verify(parsedToken, process.env.JWT_SECRET, function (err, decoded) {
      if (err) throw new Error(err.message);
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 600000,
      sameSite: "Strict",
    });
    res.redirect(process.env.URL + "/update-password");
  } catch (error) {
    res.status(401).json({ error: error.toString() });
  }
});
module.exports = router;
