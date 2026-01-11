const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection('contacts').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('contacts').findOne({ _id: contactId });
    
    if (!result) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // Validate required fields
    if (!contact.firstName || !contact.lastName || !contact.email || !contact.favoriteColor || !contact.birthday) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    const result = await mongodb.getDatabase().collection('contacts').insertOne(contact);
    
    if (result.acknowledged) {
      res.status(201).json({ id: result.insertedId });
    } else {
      res.status(500).json({ message: 'Failed to create contact' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // Validate required fields
    if (!contact.firstName || !contact.lastName || !contact.email || !contact.favoriteColor || !contact.birthday) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    const result = await mongodb.getDatabase().collection('contacts').updateOne(
      { _id: contactId },
      { $set: contact }
    );

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Contact not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: contactId });

    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};