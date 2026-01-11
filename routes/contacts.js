const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

// GET all contacts
router.get('/', contactsController.getAll);

// GET single contact by ID
router.get('/:id', contactsController.getSingle);

// POST create new contact
router.post('/', contactsController.createContact);

// PUT update contact by ID
router.put('/:id', contactsController.updateContact);

// DELETE contact by ID
router.delete('/:id', contactsController.deleteContact);

module.exports = router;