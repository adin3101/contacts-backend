const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc GET all contacts
//@route GET /api/contacts
//@acces private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ contacts });
});

//@desc Create Contact
//@route POST /api/contacts
//@acces private

const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//@desc Get Contact
//@route Get /api/contacts/:id
//@acces private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not Found");
  }
  res.status(202).json(contact);
});

//@desc Update Contact
//@route PUT /api/contacts/:id
//@acces private
const UpdateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not Found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User dont have permission to update other user contact");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(203).json(updatedContact);
});

//@desc Delete Contact
//@route Delete /api/contacts/:id
//@acces private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User dont have permission to delete other user contact");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  UpdateContact,
  deleteContact,
};
