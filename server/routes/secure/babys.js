const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const { PetEmail } = require('../../emails/index');
const Pet = require('../../db/models/baby');
const User = require('../../db/models/user');

router.post('/pets', async (req, res) => {
  const {
    name,
    type,
    avatar,
    description,
    feeding,
    cleaning,
    exercise,
    medical,
    additional,
    emergency,
    links
  } = req.body;
  try {
    const newPet = new Pet({
      name,
      type,
      avatar,
      description,
      feeding,
      cleaning,
      exercise,
      medical,
      additional,
      emergency,
      links,
      owner: req.user._id
    });
    await newPet.save();
    const newPetOwner = await User.findById(newPet.owner);
    newPetOwner.ownedPets.push(newPet._id);
    await newPetOwner.save();
    res.status(201).json(newPet);
  } catch (err) {
    if (err.errors.type.kind === 'enum') {
      res.status(500).json({ err: 'not a valid pet type' });
    } else {
      res.status(500).json({ err: err.toString() });
    }
  }
});

// Delete Pet by ID
router.delete('/pets/:id', async (req, res) => {
  try {
    let pet = await Pet.findById(req.params.id);
    let owner = await User.findByIdAndUpdate(req.user._id, {
      $pull: { ownedPets: { $in: [req.params.id] } }
    });
    pet.remove();
    res.json(pet);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Update Pet by ID
router.put('/pets/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'name',
    'type',
    'description',
    'feeding',
    'cleaning',
    'exercise',
    'medical',
    'additional',
    'emergency',
    'links',
    'avatar',
    'events'
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.post('/pets/:id/link', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    const { links } = pet;
    links.push(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Edit Pet Link By ID
router.put('/pets/:id/link/:linkID', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    const { links } = pet;
    const link = await pet.links.id(req.params.linkID);
    link.remove();
    links.push(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Get Pet Link by ID
router.get('/pets/:id/link/:linkID', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    const link = await pet.links.id(req.params.linkID);
    res.status(200).json(link);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Delete Pet Link by ID
router.delete('/pets/:id/link/:linkID', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    const link = await pet.links.id(req.params.linkID);
    link.remove();
    pet.save();
    res.json(pet);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.delete('/pets/:id/events/:eventID', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    const event = await pet.events.id(req.params.eventID);
    if (!event) {
      return res.status(404).send('event not found');
    }
    event.remove();
    await pet.save();
    res.status(201).send(pet);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// Add Pet Events
router.post('/pets/:id/events', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    pet.events.push(req.body.events);
    await pet.save();
    res.status(201).json(pet.events);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.post('/pets/:id/email', async (req, res) => {
  const { subject, message, toEmail } = req.body;
  const fromID = req.user._id;
  const name = req.user.name;
  try {
    let pet = await Pet.findById(req.params.id);
    PetEmail(subject, message, toEmail, name, pet, fromID);
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

router.post('/pets/avatar/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      res.sendStatus(410);
    } else {
      const response = await cloudinary.uploader.upload(
        req.files.avatar.tempFilePath
      );
      pet.avatar = response.secure_url;
      await pet.save();
      res.json(pet);
    }
  } catch (err) {
    res.status(400).json({ err: err.toString() });
  }
});

module.exports = router;
