const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const User = require('../../db/models/user');
const { CancellationEmail, UserEmail } = require('../../emails/index');
const Pet = require('../../db/models/baby');

router.get('/user/me', async (req, res) => {
  try {
    req.user.ownedPets = await Pet.find({ owner: req.user._id });
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Update Current User
router.put('/user/me', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'name',
    'email',
    'password',
    'avatar',
    'description',
    'ownedPets',
    'favPets',
    'favUsers',
    'events'
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: 'invalid updates!' });
  }
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.json(req.user);
  } catch (err) {
    res.status(400).json({ err: err.toString() });
  }
});

// Delete Current User
router.delete('/user/me', async (req, res) => {
  try {
    CancellationEmail(req.user.email);
    await req.user.remove();
    res.clearCookie('jwt');
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.get('/user/me/favorites', async (req, res) => {
  try {
    const favorites = [];
    // get current user's fav users, get the info of those users, split into owner/sitter
    const userArray = await User.findById({ _id: req.user._id }, 'favUsers');
    const myFavUsers = await User.find({ _id: { $in: userArray.favUsers } });
    const favOwners = myFavUsers.filter((user) => user.owner);
    const favSitters = myFavUsers.filter((user) => !user.owner);

    //get current user's fav pets, get the info of those pets
    const petArray = await User.findById({ _id: req.user._id }, 'favPets');
    const favPets = await Pet.find({ _id: { $in: petArray.favPets } });

    // condense all three into one array
    favorites.push(
      { pets: favPets },
      { owners: favOwners },
      { sitters: favSitters }
    );
    res.send(favorites);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Toggle Favorite
router.put('/user/me/favorites', async (req, res) => {
  // value of profile needs to be 'favUsers' or 'favPets'
  let { id, profile } = req.query;
  try {
    if (req.user[profile].includes(id)) {
      req.user[profile].pull(id);
    } else {
      req.user[profile].push(id);
    }
    req.user.save();
    res.send(req.user);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.post('/user/me/events', async (req, res) => {
  try {
    req.user.events.push(req.body.events);
    req.user.save();
    res.status(201).send(req.user);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Delete Events
router.delete('/user/me/events/:id', async (req, res) => {
  try {
    const event = await req.user.events.id(req.params.id);
    event.remove();
    req.user.save();
    res.status(201).send(req.user);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.post('/user/me/message', async (req, res) => {
  const { subject, message } = req.body;
  const { toEmail, name, userID } = req.query;
  try {
    UserEmail(userID, name, subject, message, toEmail);
    res.status(200).json('message sent!');
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.post('/user/avatar', async (req, res) => {
  try {
    const response = await cloudinary.uploader.upload(
      req.files.avatar.tempFilePath
    );
    req.user.avatar = response.secure_url;
    await req.user.save();
    res.json(response);
  } catch (err) {
    res.status(400).json({ err: err.toString() });
  }
});

router.post('/user/logout', async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.clearCookie('jwt');
    res.json({ message: 'logged out!' });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// User Logout (all devices)
router.post('/user/logoutAll', async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.clearCookie('jwt');
    res.json({ message: 'all devices logged out' });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Update Password
router.put('/password', async (req, res) => {
  try {
    req.user.password = req.body.password;
    await req.user.save();
    res.clearCookie('jwt');
    res.json({ message: 'password updated successfully' });
  } catch (err) {
    res.json({ err: err.toString() });
  }
});

module.exports = router;
