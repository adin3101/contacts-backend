const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  getContact,
  UpdateContact,
  deleteContact,
} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(UpdateContact).delete(deleteContact);

module.exports = router;